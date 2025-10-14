import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Verifica se o mês ainda é válido (>= mês atual)
 */
function isMesAtivo(mes: string | null | undefined) {
  if (!mes) return false;
  const [ano, mesNum] = mes.split("-").map(Number);
  const agora = new Date();
  const anoAtual = agora.getFullYear();
  const mesAtual = agora.getMonth() + 1;
  return ano > anoAtual || (ano === anoAtual && mesNum >= mesAtual);
}

/**
 * GET: Retorna serviços com disponibilidades ativas
 */
export async function GET() {
  try {
    const servicos = await prisma.servicos.findMany({
      include: {
        disponibilidadeprod: {
          include: {
            produtos: true,
            funcionarios: true,
          },
        },
      },
    });

    // Filtra disponibilidades ativas conforme regras
    const disponiveis = servicos.map((servico) => {
      const dispFiltrada = servico.disponibilidadeprod.filter((dp) => {
        const produto = dp.produtos;
        const funcionario = dp.funcionarios;

        const estoqueOk =
          !produto ||
          produto.Estoque == null ||
          produto.EstoqueCritico == null ||
          produto.Estoque > produto.EstoqueCritico;

        const funcionarioAtivo = funcionario?.Status === "Ativo";
        const mesValido = isMesAtivo(dp.Mes);

        return estoqueOk && funcionarioAtivo && mesValido;
      });

      return {
        ...servico,
        disponibilidadeAtiva: dispFiltrada,
      };
    });

    return NextResponse.json(disponiveis);
  } catch (error) {
    console.error("Erro ao buscar disponibilidade:", error);
    return NextResponse.json(
      { error: "Erro ao carregar disponibilidade" },
      { status: 500 }
    );
  }
}

/**
 * POST: Cria novas disponibilidades
 * Calcula automaticamente o campo Ativo e relaciona Id_Produto com o Id_Servico
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      !body ||
      !Array.isArray(body.disponibilidades) ||
      body.disponibilidades.length === 0
    ) {
      return NextResponse.json(
        { error: "Formato inválido: esperado { disponibilidades: [] }" },
        { status: 400 }
      );
    }

    // Coleta IDs únicos
    // assegura que disponiblidades é um array antes de mapear para evitar tipos unknown[]
    const disponibilidades = Array.isArray(body.disponibilidades)
      ? (body.disponibilidades as any[])
      : [];

    const idsServicos: number[] = [
      ...new Set(
        disponibilidades
          .map((d: any) => d.Id_Servico)
          .filter((id: any): id is number => typeof id === "number")
      ),
    ];

    const idsProdutos: number[] = [
      ...new Set(
        disponibilidades
          .map((d: any) => d.Id_Produto)
          .filter((id: any): id is number => typeof id === "number")
      ),
    ];

    const idsFuncionarios: number[] = [
      ...new Set(
        disponibilidades
          .map((d: any) => d.Id_Funcionario)
          .filter((id: any): id is number => typeof id === "number")
      ),
    ];

    // Busca dados relacionados
    const [servicos, produtos, funcionarios] = await Promise.all([
      prisma.servicos.findMany({ where: { Id_Servico: { in: idsServicos } } }),
      prisma.produtos.findMany({ where: { Id_Produto: { in: idsProdutos } } }),
      prisma.funcionarios.findMany({
        where: { Id_Funcionario: { in: idsFuncionarios } },
      }),
    ]);

    // Normaliza e calcula campo Ativo + Id_Produto via serviço
    type Registro = {
      Id_Produto: number | null;
      Id_Servico: number | null;
      Mes: string | null;
      Inicio: Date | null;
      AlmocoInicio: Date | null;
      AlmocoFim: Date | null;
      Fim: Date | null;
      Id_Funcionario: number | null;
      Duracao: number | null;
      Tolerancia: number;
      Ativo: boolean;
    };

    const registros: Registro[] = body.disponibilidades.map((d: any) => {
      // se o serviço tiver produto vinculado, usa-o
      const servicoRelacionado = servicos.find(
        (s) => s.Id_Servico === d.Id_Servico
      );
      const produtoRelacionado =
        d.Id_Produto ?? servicoRelacionado?.Id_Produto ?? null;

      const produto = produtos.find(
        (p) => p.Id_Produto === produtoRelacionado
      );
      const funcionario = funcionarios.find(
        (f) => f.Id_Funcionario === d.Id_Funcionario
      );

      const estoqueOk =
        !produto ||
        produto.Estoque == null ||
        produto.EstoqueCritico == null ||
        produto.Estoque > produto.EstoqueCritico;
      const funcionarioAtivo = funcionario?.Status === "Ativo";
      const mesValido = isMesAtivo(d.Mes);
      const ativo = estoqueOk && funcionarioAtivo && mesValido;

      return {
        Id_Produto: produtoRelacionado,
        Id_Servico: d.Id_Servico ?? null,
        Mes: d.Mes,
        Inicio: d.Inicio ? new Date(d.Inicio) : null,
        AlmocoInicio: d.AlmocoInicio ? new Date(d.AlmocoInicio) : null,
        AlmocoFim: d.AlmocoFim ? new Date(d.AlmocoFim) : null,
        Fim: d.Fim ? new Date(d.Fim) : null,
        Id_Funcionario: d.Id_Funcionario,
        Duracao: d.Duracao ?? null,
        Tolerancia: d.Tolerancia ?? 0,
        Ativo: ativo,
      };
    });

    // Remove duplicadas antes de inserir (Mes + Id_Servico + Id_Funcionario)
    await prisma.disponibilidadeprod.deleteMany({
      where: {
        OR: registros.map((r) => ({
          Mes: r.Mes,
          Id_Servico: r.Id_Servico,
          Id_Funcionario: r.Id_Funcionario,
        })),
      },
    });

    // Cria novas
    await prisma.disponibilidadeprod.createMany({ data: registros });

    return NextResponse.json(
      {
        message: "Disponibilidades criadas com sucesso",
        count: registros.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar disponibilidades:", error);
    return NextResponse.json(
      { error: "Erro ao criar disponibilidades" },
      { status: 500 }
    );
  }
}

/**
 * PUT: Atualiza disponibilidade existente
 * Recalcula o campo Ativo e também preenche Id_Produto com base no Id_Servico
 */
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.Id_Disponibilidade) {
      return NextResponse.json(
        { error: "Id_Disponibilidade é obrigatório" },
        { status: 400 }
      );
    }

    // busca produto direto ou via serviço
    const servico = data.Id_Servico
      ? await prisma.servicos.findUnique({
          where: { Id_Servico: data.Id_Servico },
        })
      : null;

    const produtoRelacionado =
      data.Id_Produto ?? servico?.Id_Produto ?? null;

    const produto = produtoRelacionado
      ? await prisma.produtos.findUnique({
          where: { Id_Produto: produtoRelacionado },
        })
      : null;

    const funcionario = data.Id_Funcionario
      ? await prisma.funcionarios.findUnique({
          where: { Id_Funcionario: data.Id_Funcionario },
        })
      : null;

    const estoqueOk =
      !produto ||
      produto.Estoque == null ||
      produto.EstoqueCritico == null ||
      produto.Estoque > produto.EstoqueCritico;
    const funcionarioAtivo = funcionario?.Status === "Ativo";
    const mesValido = isMesAtivo(data.Mes);
    const ativo = estoqueOk && funcionarioAtivo && mesValido;

    const disponibilidadeAtualizada = await prisma.disponibilidadeprod.update({
      where: { Id_Disponibilidade: data.Id_Disponibilidade },
      data: {
        Id_Produto: produtoRelacionado,
        Id_Servico: data.Id_Servico ?? null,
        Mes: data.Mes,
        Inicio: data.Inicio ? new Date(data.Inicio) : null,
        AlmocoInicio: data.AlmocoInicio ? new Date(data.AlmocoInicio) : null,
        AlmocoFim: data.AlmocoFim ? new Date(data.AlmocoFim) : null,
        Fim: data.Fim ? new Date(data.Fim) : null,
        Id_Funcionario: data.Id_Funcionario,
        Duracao: data.Duracao,
        Tolerancia: data.Tolerancia,
        Ativo: ativo,
      },
    });

    return NextResponse.json(disponibilidadeAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar disponibilidade:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar disponibilidade" },
      { status: 500 }
    );
  }
}

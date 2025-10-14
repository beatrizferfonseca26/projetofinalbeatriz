import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET: Retorna serviços + produtos + disponibilidade
 */
export async function GET() {
  try {
    const servicos = await prisma.servicos.findMany({
      include: {
        disponibilidadeprod: {
          where: { Ativo: true },
          include: { produtos: true, funcionarios: true },
        },
      },
    });

    const funcionariosAtivos = await prisma.funcionarios.findMany({
      where: { Status: "Ativo" },
    });

    if (funcionariosAtivos.length === 0) {
      return NextResponse.json([]);
    }

    // Filtra serviços com produtos em estoque suficiente
    const disponiveis = servicos.filter((servico) => {
      if (!servico.disponibilidadeprod || servico.disponibilidadeprod.length === 0)
        return true;

      return servico.disponibilidadeprod.every((dp) => {
        const produto = dp.produtos;
        if (!produto?.EstoqueCritico || produto.Estoque === null) return true;
        return produto.Estoque > produto.EstoqueCritico;
      });
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
 * POST: Cria múltiplas disponibilidades
 * Espera um body JSON como:
 * {
 *   disponibilidades: [
 *     {
 *       Id_Produto,
 *       Id_Servico,
 *       Mes,
 *       Inicio,
 *       AlmocoInicio,
 *       AlmocoFim,
 *       Fim,
 *       Id_Funcionario,
 *       Duracao,
 *       Tolerancia
 *     }
 *   ]
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const disponibilidades = data.disponibilidades;

    if (!data || !Array.isArray(disponibilidades) || disponibilidades.length === 0) {
      return NextResponse.json(
        { error: "Formato inválido: esperado { disponibilidades: [] } com ao menos um item" },
        { status: 400 }
      );
    }

    // Normaliza e valida os dados recebidos
    const registros = disponibilidades.map((d: any) => ({
      Id_Produto: d.Id_Produto ?? null,
      Id_Servico: d.Id_Servico ?? null,
      Mes: d.Mes,
      Inicio: d.Inicio ? new Date(d.Inicio) : null,
      AlmocoInicio: d.AlmocoInicio ? new Date(d.AlmocoInicio) : null,
      AlmocoFim: d.AlmocoFim ? new Date(d.AlmocoFim) : null,
      Fim: d.Fim ? new Date(d.Fim) : null,
      Id_Funcionario: d.Id_Funcionario,
      Duracao: d.Duracao ?? null,
      Tolerancia: d.Tolerancia ?? 0,
      Ativo: true,
    }));

    // Usar createMany com skipDuplicates para evitar erros se já existir
    const result = await prisma.disponibilidadeprod.createMany({
      data: registros,
      skipDuplicates: true, // evita erro se já existir
    });

    return NextResponse.json(
      { message: "Disponibilidades criadas com sucesso", count: result.count },
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
 * PUT: Atualiza uma disponibilidade existente
 * Espera:
 * {
 *   Id_Disponibilidade,
 *   ...campos para atualizar
 * }
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

    const disponibilidadeAtualizada = await prisma.disponibilidadeprod.update({
      where: {
        Id_Disponibilidade: data.Id_Disponibilidade,
      },
      data: {
        Id_Produto: data.Id_Produto ?? null,
        Id_Servico: data.Id_Servico ?? null,
        Mes: data.Mes,
        Inicio: data.Inicio ? new Date(data.Inicio) : null,
        AlmocoInicio: data.AlmocoInicio ? new Date(data.AlmocoInicio) : null,
        AlmocoFim: data.AlmocoFim ? new Date(data.AlmocoFim) : null,
        Fim: data.Fim ? new Date(data.Fim) : null,
        Id_Funcionario: data.Id_Funcionario,
        Duracao: data.Duracao,
        Tolerancia: data.Tolerancia,
        Ativo: data.Ativo ?? true,
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

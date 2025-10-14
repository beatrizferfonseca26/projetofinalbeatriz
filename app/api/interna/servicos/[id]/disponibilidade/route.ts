import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/interna/servicos/[id]/disponibilidade
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const servicoId = Number(params.id);
    const { searchParams } = new URL(req.url);
    const funcionarioId = searchParams.get('funcionarioId');

    if (isNaN(servicoId)) {
      return NextResponse.json(
        { error: "ID do serviço inválido." },
        { status: 400 }
      );
    }

    // Verificar se o serviço existe
    const servico = await prisma.servicos.findUnique({
      where: { Id_Servico: servicoId },
      select: { Id_Servico: true, Nome: true },
    });

    if (!servico) {
      return NextResponse.json(
        { error: "Serviço não encontrado." },
        { status: 404 }
      );
    }

    // Buscar disponibilidades do serviço
    const whereClause: any = {
      Id_Servico: servicoId,
      Ativo: true,
    };

    // Se funcionarioId foi fornecido, filtrar por funcionário
    if (funcionarioId && !isNaN(Number(funcionarioId))) {
      whereClause.Id_Funcionario = Number(funcionarioId);
    }

    const disponibilidades = await prisma.disponibilidadeprod.findMany({
      where: whereClause,
      include: {
        funcionarios: {
          select: { Id_Funcionario: true, Nome: true, Status: true },
        },
        produtos: {
          select: { Id_Produto: true, Nome: true, Estoque: true, EstoqueCritico: true },
        },
        servicos: {
          select: { Id_Servico: true, Nome: true, Duracao: true, Valor: true },
        },
      },
      orderBy: [
        { Mes: 'asc' },
        { Id_Funcionario: 'asc' },
        { Inicio: 'asc' },
      ],
    });

    // Filtrar apenas funcionários ativos
    const disponibilidadesFiltradas = disponibilidades.filter(
      (disp) => disp.funcionarios?.Status === 'Ativo'
    );

    // Formatar as disponibilidades para o formato esperado pelo frontend
    const disponibilidadesFormatadas = disponibilidadesFiltradas.map((disp) => ({
      Id_Disponibilidade: disp.Id_Disponibilidade,
      Id_Servico: disp.Id_Servico,
      Id_Funcionario: disp.Id_Funcionario,
      Id_Produto: disp.Id_Produto,
      Mes: disp.Mes,
      Data: disp.Mes, // Usar Mes como Data para compatibilidade
      HoraInicio: disp.Inicio 
        ? `${String(disp.Inicio.getHours()).padStart(2, '0')}:${String(disp.Inicio.getMinutes()).padStart(2, '0')}`
        : null,
      HoraFinal: disp.Fim 
        ? `${String(disp.Fim.getHours()).padStart(2, '0')}:${String(disp.Fim.getMinutes()).padStart(2, '0')}`
        : null,
      AlmocoInicio: disp.AlmocoInicio 
        ? `${String(disp.AlmocoInicio.getHours()).padStart(2, '0')}:${String(disp.AlmocoInicio.getMinutes()).padStart(2, '0')}`
        : null,
      AlmocoFim: disp.AlmocoFim 
        ? `${String(disp.AlmocoFim.getHours()).padStart(2, '0')}:${String(disp.AlmocoFim.getMinutes()).padStart(2, '0')}`
        : null,
      Duracao: disp.Duracao,
      Tolerancia: disp.Tolerancia,
      Ativo: disp.Ativo,
      funcionario: disp.funcionarios ? {
        Id_Funcionario: disp.funcionarios.Id_Funcionario,
        Nome: disp.funcionarios.Nome,
        Status: disp.funcionarios.Status,
      } : null,
      produto: disp.produtos ? {
        Id_Produto: disp.produtos.Id_Produto,
        Nome: disp.produtos.Nome,
        Estoque: disp.produtos.Estoque,
        EstoqueCritico: disp.produtos.EstoqueCritico,
      } : null,
      servico: disp.servicos ? {
        Id_Servico: disp.servicos.Id_Servico,
        Nome: disp.servicos.Nome,
        Duracao: disp.servicos.Duracao,
        Valor: disp.servicos.Valor,
      } : null,
    }));

    return NextResponse.json({
      disponibilidade: disponibilidadesFormatadas,
      total: disponibilidadesFormatadas.length,
      servico: {
        Id_Servico: servico.Id_Servico,
        Nome: servico.Nome,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar disponibilidade do serviço:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar disponibilidade." },
      { status: 500 }
    );
  }
}
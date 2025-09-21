import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Buscar serviços + produtos relacionados
    const servicos = await prisma.servicos.findMany({
      include: {
        disponibilidadeprod: {
          include: {
            produtos: true,
          },
        },
      },
    });

    // Buscar funcionários ativos
    const funcionariosAtivos = await prisma.funcionarios.findMany({
      where: { Status: "Ativo" },
    });

    // Se não há nenhum funcionário ativo, nada está disponível
    if (funcionariosAtivos.length === 0) {
      return NextResponse.json([]);
    }

    // Filtrar os serviços que dependem de produtos com estoque crítico
    const disponiveis = servicos.filter((servico) => {
      if (!servico.disponibilidadeprod || servico.disponibilidadeprod.length === 0) {
        return true; // serviços que não têm vínculo direto com produtos
      }

      // Verificar se todos os produtos estão acima do estoque crítico
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

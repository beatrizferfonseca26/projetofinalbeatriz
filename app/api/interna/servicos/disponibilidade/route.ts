// app/api/interna/servicos/disponibilidade/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET() {
  try {
    // Buscar todos os serviços com suas disponibilidades (sem filtrar horários ocupados)
    const servicosDisponiveis = await prisma.servicos.findMany({
      where: {
        disponibilidadeprod: { some: { Ativo: true } },
      },
      include: {
        disponibilidadeprod: true,
        produtos: {
          include: { imagens: true },
        },
      },
    });
    return NextResponse.json({ servicosDisponiveis });
  } catch (error) {
    console.error('Erro ao buscar serviços disponíveis:', error);
    return NextResponse.json({ error: 'Erro ao buscar serviços disponíveis' }, { status: 500 });
  }
}

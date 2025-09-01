import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const funcionarios = await prisma.funcionarios.findMany({
      where: { Status: 'Ativo' }, 
    });

    return NextResponse.json(funcionarios);
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    return NextResponse.json({ error: 'Erro ao buscar funcionários' }, { status: 500 });
  }
}

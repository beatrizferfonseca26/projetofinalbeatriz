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
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { Nome, Email, Senha } = data;
    const novoFuncionario = await prisma.funcionarios.create({
      data: {
        Nome,
        Email,
        Senha,
        Status: 'Ativo',
      },
    });
    return NextResponse.json(novoFuncionario, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    return NextResponse.json({ error: 'Erro ao criar funcionário' }, { status: 500 });
  }
}

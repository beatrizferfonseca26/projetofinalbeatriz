import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET retorna lista completa de clientes (para funcionarios/admin)
export async function GET() {
  try {
    const clientes = await prisma.clientes.findMany({
      orderBy: { Id_Cliente: 'desc' },
      select: {
        Id_Cliente: true,
        Nome: true,
        Email: true,
        Telemovel: true,
        DataNascimento: true,
        Morada: true,
        Nif: true,
      },
    });
    return NextResponse.json(clientes);
  } catch (err) {
    console.error('GET /api/interna/clientes error', err);
    return NextResponse.json({ error: 'Erro ao listar clientes' }, { status: 500 });
  }
}
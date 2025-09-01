import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: Listar agendamento
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Aqui assumo que o email do cliente está em session.user.email
    // e que a tabela clientes tem o campo Email
    const cliente = await prisma.clientes.findFirst({
      where: { Email: session.user.email },
    });

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    const agendamentos = await prisma.agendamentos.findMany({
      where: {
        Id_Cliente: cliente.Id_Cliente,
      },
      orderBy: [
        { Data: 'desc' },
        { HoraInicio: 'desc' },
      ],
      include: {
        servicos: true,
        clientes: true,
        funcionarios: true,
      },
    });

    return NextResponse.json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}

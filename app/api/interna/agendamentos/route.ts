import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: Listar agendamentos
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const cliente = await prisma.clientes.findFirst({
      where: { Email: session.user.email },
    });

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    const agendamentos = await prisma.agendamentos.findMany({
      where: { Id_Cliente: cliente.Id_Cliente },
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

// POST: Criar novo agendamento
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { Id_Servico, Data, HoraInicio, Observacoes } = await request.json();

    if (!Id_Servico || !Data || !HoraInicio) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const cliente = await prisma.clientes.findFirst({
      where: { Email: session.user.email },
    });

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    // Converter strings para Date se necessário
    const dataAgendamento = new Date(`${Data}T${HoraInicio}`);

    const novoAgendamento = await prisma.agendamentos.create({
      data: {
        Id_Servico,
        Id_Cliente: cliente.Id_Cliente,
        Data: dataAgendamento,
        HoraInicio,
        Observacoes: Observacoes ?? null,
      },
      include: {
        servicos: true,
        clientes: true,
        funcionarios: true,
      },
    });

    return NextResponse.json(novoAgendamento, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao criar agendamento' }, { status: 500 });
  }
}

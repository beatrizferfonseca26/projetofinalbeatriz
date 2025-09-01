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
        funcionarios: true,  
      },
    });
    const agendamentosFormatados = agendamentos.map((ag) => {
      let horaFormatada = '';
      if (ag.HoraInicio instanceof Date) {
        const h = ag.HoraInicio.getHours().toString().padStart(2, '0');
        const m = ag.HoraInicio.getMinutes().toString().padStart(2, '0');
        horaFormatada = `${h}:${m}`;
      }

      return {
        Id_Agendamento: ag.Id_Agendamento,
        Data: ag.Data ? ag.Data.toISOString().split('T')[0] : '', // YYYY-MM-DD
        HoraInicio: horaFormatada,
        HoraFinal: ag.HoraFinal
          ? `${ag.HoraFinal.getHours().toString().padStart(2, '0')}:${ag.HoraFinal.getMinutes().toString().padStart(2, '0')}`
          : '',
        Status: ag.Status || '',
        Servico: ag.servicos?.Nome || '',
        Valor: ag.servicos?.Valor || 0,
        Funcionario: ag.funcionarios?.Nome || null,
      };
    });


    return NextResponse.json(agendamentosFormatados);
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

    const { Id_Servico, Id_Funcionario, Data, HoraInicio, Observacoes } = await request.json();

    if (!Id_Servico || !Data || !HoraInicio) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const cliente = await prisma.clientes.findFirst({
      where: { Email: session.user.email },
    });

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    // Converter HoraInicio em objeto Date apenas para hora
    const [hours, minutes] = HoraInicio.split(':').map(Number);
    if (hours == null || minutes == null) {
      return NextResponse.json({ error: 'Hora inválida' }, { status: 400 });
    }

    const dataAgendamento = new Date(`${Data}T${HoraInicio}:00`);
    if (isNaN(dataAgendamento.getTime())) {
      return NextResponse.json({ error: 'Data ou hora inválida' }, { status: 400 });
    }

    const novoAgendamento = await prisma.agendamentos.create({
      data: {
        Id_Servico,
        Id_Cliente: cliente.Id_Cliente,
        Id_Funcionario: Id_Funcionario ?? null,
        Data: dataAgendamento,
        HoraInicio: new Date(0, 0, 0, hours, minutes),
        Observacoes: Observacoes ?? null,
      },
      include: {
        servicos: true,
        clientes: true,
        funcionarios: true,
      },
    });

    console.log('Novo agendamento criado:', novoAgendamento);

    return NextResponse.json(novoAgendamento, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao criar agendamento' }, { status: 500 });
  }
}
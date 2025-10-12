import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET — lista os agendamentos do funcionário
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const funcionario = await prisma.funcionarios.findFirst({
      where: { Email: session.user.email },
      select: { Id_Funcionario: true },
    });
    if (!funcionario) {
      return NextResponse.json({ error: 'Funcionário não encontrado' }, { status: 404 });
    }

    const agendamentos = await prisma.agendamentos.findMany({
      where: { Id_Funcionario: funcionario.Id_Funcionario },
      orderBy: { Data: 'desc' },
      include: {
        clientes: true,
        servicos: true,
      },
    });

    const agendamentosFormatados = agendamentos.map((ag) => ({
      ...ag,
      Data:
        ag.Data instanceof Date
          ? ag.Data.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })
          : ag.Data,
      HoraInicio:
        ag.HoraInicio instanceof Date
          ? ag.HoraInicio.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
          : ag.HoraInicio,
      HoraFinal:
        ag.HoraFinal instanceof Date
          ? ag.HoraFinal.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
          : ag.HoraFinal,
    }));

    return NextResponse.json(agendamentosFormatados);
  } catch (err) {
    console.error('GET /api/interna/funcionarios/agendamentos error', err);
    return NextResponse.json({ error: 'Erro ao listar agendamentos' }, { status: 500 });
  }
}

// POST — cria um novo agendamento
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const funcionario = await prisma.funcionarios.findFirst({
      where: { Email: session.user.email },
      select: { Id_Funcionario: true },
    });
    if (!funcionario) {
      return NextResponse.json({ error: 'Funcionário não encontrado' }, { status: 404 });
    }

    // Corpo do request
    const body = await request.json();
    const { Id_Servico, Data, HoraInicio, HoraFinal, Id_Cliente, Observacoes, Modalidade, Valor } = body;

    if (!Id_Servico || !Data || !HoraInicio || !HoraFinal || !Id_Cliente) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    // Criar o agendamento
    const agendamento = await prisma.agendamentos.create({
      data: {
        Id_Servico: Number(Id_Servico),
        Id_Funcionario: funcionario.Id_Funcionario,
        Id_Cliente: Number(Id_Cliente),
        Data: new Date(Data),
        HoraInicio: new Date(`${Data}T${HoraInicio}:00`),
        HoraFinal: new Date(`${Data}T${HoraFinal}:00`),
        Observacoes: Observacoes ?? null,
      },
    });

    // Criar o pagamento associado ao agendamento
    const pagamento = await prisma.pagamentos.create({
      data: {
        Id_Agendamento: agendamento.Id_Agendamento,
        Modalidade: Modalidade || 'Online', 
        Valor: Valor ? Number(Valor) : null,
        Status: 'NOK', // STATUS INICIAL 
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Agendamento e pagamento criados com sucesso.',
        agendamento,
        pagamento,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/interna/funcionarios/agendamentos error', err);
    return NextResponse.json({ error: 'Erro ao criar agendamento' }, { status: 500 });
  }
}
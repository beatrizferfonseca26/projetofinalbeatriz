import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: Listar todos os agendamentos
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const agendamentos = await prisma.agendamentos.findMany({
      orderBy: [
        { Data: 'desc' },
        { HoraInicio: 'desc' },
      ],
      include: {
        servicos: true,
        funcionarios: true,
        clientes: true, // opcional, caso queira exibir o cliente
      },
    });

    const agendamentosFormatados = agendamentos.map((ag) => {
      let horaInicio = '';
      let horaFinal = '';

      if (ag.HoraInicio instanceof Date) {
        const h = ag.HoraInicio.getHours().toString().padStart(2, '0');
        const m = ag.HoraInicio.getMinutes().toString().padStart(2, '0');
        horaInicio = `${h}:${m}`;
      }

      if (ag.HoraFinal instanceof Date) {
        const h = ag.HoraFinal.getHours().toString().padStart(2, '0');
        const m = ag.HoraFinal.getMinutes().toString().padStart(2, '0');
        horaFinal = `${h}:${m}`;
      }

      return {
        Id_Agendamento: ag.Id_Agendamento,
        Data: ag.Data ? ag.Data.toISOString().split('T')[0] : '',
        HoraInicio: horaInicio,
        HoraFinal: horaFinal,
        Status: ag.Status || '',
        Servico: ag.servicos?.Nome || '',
        Valor: ag.servicos?.Valor || 0,
        Funcionario: ag.funcionarios?.Nome || null,
        Cliente: ag.clientes?.Nome || null, // caso queira exibir no front
        Observacoes: ag.Observacoes || null,
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
  console.log('POST /api/interna/agendamentos chamado', Date.now());
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { Id_Servico, Id_Funcionario, Data, HoraInicio, Observacoes } = await request.json();
    if (!Id_Servico || !Data || !HoraInicio) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // Tudo dentro de uma transação para garantir atomicidade
    const resultado = await prisma.$transaction(async (tx) => {
      const cliente = await tx.clientes.findFirst({
        where: { Email: session.user.email },
      });
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      // Buscar duração do serviço
      const servico = await tx.servicos.findUnique({
        where: { Id_Servico: Id_Servico },
        select: { Duracao: true, Nome: true },
      });
      if (!servico || !servico.Duracao) {
        throw new Error('Serviço não encontrado ou sem duração definida');
      }

      // Converter HoraInicio em objeto Date apenas para hora
      const [hours, minutes] = HoraInicio.split(':').map(Number);
      if (hours == null || minutes == null) {
        throw new Error('Hora inválida');
      }

      // Data apenas (sem hora)
      const dataOnly = new Date(Data + 'T00:00:00');
      if (isNaN(dataOnly.getTime())) {
        throw new Error('Data inválida');
      }

      // HoraInicio e HoraFinal como Date na data correta
      const horaInicioDate = new Date(Data + 'T' + HoraInicio + ':00');
      if (isNaN(horaInicioDate.getTime())) {
        throw new Error('Hora de início inválida');
      }
      const horaFinalDate = new Date(horaInicioDate);
      horaFinalDate.setMinutes(horaFinalDate.getMinutes() + servico.Duracao);

      // Verificar se já existe agendamento igual (mesmo cliente, serviço, data e hora de início)
      const agendamentoExistente = await tx.agendamentos.findFirst({
        where: {
          Id_Cliente: cliente.Id_Cliente,
          Id_Servico: Id_Servico,
          Data: dataOnly,
          HoraInicio: horaInicioDate,
        },
      });
      if (agendamentoExistente) {
        throw new Error('Já existe um agendamento para este horário.');
      }

      // Verificar conflito de horário para o mesmo serviço e funcionário (ou qualquer funcionário se não selecionado)
      const conflitos = await tx.agendamentos.findMany({
        where: {
          Data: dataOnly,
          Id_Servico: Id_Servico,
          ...(Id_Funcionario ? { Id_Funcionario: Id_Funcionario } : {}),
          OR: [
            {
              HoraInicio: { lt: horaFinalDate },
              HoraFinal: { gt: horaInicioDate },
            },
          ],
        },
      });
      if (conflitos.length > 0) {
        throw new Error('Horário indisponível. Escolha outro horário.');
      }

      const novoAgendamento = await tx.agendamentos.create({
        data: {
          Id_Servico,
          Id_Cliente: cliente.Id_Cliente,
          Id_Funcionario: Id_Funcionario ?? null,
          Data: dataOnly,
          HoraInicio: horaInicioDate,
          HoraFinal: horaFinalDate,
          Observacoes: Observacoes ?? null,
        },
        include: {
          servicos: true,
          clientes: true,
          funcionarios: true,
        },
      });
      return { novoAgendamento, cliente, servico, horaFinalDate };
    });

    // Fora da transação: enviar e-mail
    const { novoAgendamento, cliente, servico, horaFinalDate } = resultado;
    const emailHtml = `
      <h2>Confirmação de Agendamento</h2>
      <p><strong>Serviço:</strong> ${novoAgendamento.servicos.Nome}</p>
      <p><strong>Data:</strong> ${Data}</p>
      <p><strong>Hora:</strong> ${HoraInicio} - ${horaFinalDate.getHours().toString().padStart(2, '0')}:${horaFinalDate.getMinutes().toString().padStart(2, '0')}</p>
      ${novoAgendamento.funcionarios ? `<p><strong>Profissional:</strong> ${novoAgendamento.funcionarios.Nome}</p>` : ''}
      <p>Obrigado por escolher a ${process.env.APP_NAME}</p>
    `;

    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/interna/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: cliente.Email,
        subject: `Confirmação de Agendamento - ${process.env.APP_NAME}`,
        html: emailHtml,
      }),
    });
    console.log('E-mail de confirmação enviado para:', cliente.Email);
    return NextResponse.json(novoAgendamento, { status: 201 });
  } catch (error) {
    let msg = 'Erro ao criar agendamento';
    if (typeof error === 'object' && error && 'message' in error) {
      msg = (error as any).message;
    }
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PUT: Atualizar status do agendamento e ajustar estoque do produto se necessário
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }


    const { Id_Agendamento, Status } = await request.json();

    if (!Id_Agendamento || !Status) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // Só permite Confirmado ou Cancelado
    if (Status !== 'Confirmado' && Status !== 'Cancelado') {
      return NextResponse.json({ error: 'Status inválido. Só é permitido Confirmado ou Cancelado.' }, { status: 400 });
    }

    // Atualiza o status do agendamento
    const agendamentoAtualizado = await prisma.agendamentos.update({
      where: { Id_Agendamento: Number(Id_Agendamento) },
      data: { Status },
      include: {
        servicos: {
          include: {
            produtos: true, // <- se serviços tiverem relação N:N com produtos
          },
        },
      },
    });

    return NextResponse.json(agendamentoAtualizado);

  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao atualizar agendamento' }, { status: 500 });
  }
}

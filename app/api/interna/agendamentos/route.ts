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

    const { Id_Servico, Id_Funcionario, Data, HoraInicio, Observacoes, ModalidadePagamento } = await request.json();
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
        select: { Duracao: true, Nome: true, Valor: true },
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

      // Criar registro de pagamento vinculado (valor do serviço)
      // ModalidadePagamento pode ser 'Online' ou 'Presencial' (default Online)
      const pagamento = await tx.pagamentos.create({
        data: {
          Valor: servico?.Valor ?? undefined,
          Status: null,
          Modalidade: ModalidadePagamento === 'Presencial' ? 'Presencial' : 'Online',
          Fatura: null,
          Id_Agendamento: novoAgendamento.Id_Agendamento,
        },
      });

      return { novoAgendamento, cliente, servico, horaFinalDate, pagamento };
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
    // Prisma unique constraint error (duplicate)
    if (typeof error === 'object' && error && 'code' in error && (error as any).code === 'P2002') {
      console.error('Erro de duplicado ao criar agendamento:', error);
      return NextResponse.json({ error: 'Agendamento duplicado.' }, { status: 409 });
    }
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


    const body = await request.json();

    // If the request includes only Status and Id_Agendamento, keep legacy status-only path
    if (body.Id_Agendamento && body.Status && Object.keys(body).length === 2) {
      const { Id_Agendamento, Status } = body;
      if (Status !== 'Confirmado' && Status !== 'Cancelado') {
        return NextResponse.json({ error: 'Status inválido. Só é permitido Confirmado ou Cancelado.' }, { status: 400 });
      }

      const agendamentoAtualizado = await prisma.agendamentos.update({
        where: { Id_Agendamento: Number(Id_Agendamento) },
        data: { Status },
        include: {
          servicos: {
            include: {
              produtos: true,
            },
          },
        },
      });

      return NextResponse.json(agendamentoAtualizado);
    }

    // Otherwise, treat as a full edit: Id_Agendamento, Id_Servico, Data, HoraInicio, optional Id_Funcionario, Observacoes
    const { Id_Agendamento, Id_Servico, Data, HoraInicio, Id_Funcionario, Observacoes } = body;
    if (!Id_Agendamento || !Id_Servico || !Data || !HoraInicio) {
      return NextResponse.json({ error: 'Dados incompletos para edição' }, { status: 400 });
    }

    // Run in transaction: validate client ownership, service duration, compute HoraFinal, check conflicts, then update
    const resultado = await prisma.$transaction(async (tx) => {
      const ag = await tx.agendamentos.findUnique({ where: { Id_Agendamento: Number(Id_Agendamento) } });
      if (!ag) throw new Error('Agendamento não encontrado');

      // Optional: only allow owner to edit (if cliente)
      const sessionEmail = session.user.email;
      const cliente = await tx.clientes.findFirst({ where: { Email: sessionEmail } });
      if (!cliente) throw new Error('Cliente não encontrado');
      if (ag.Id_Cliente !== cliente.Id_Cliente) throw new Error('Não autorizado a editar este agendamento');

      const servico = await tx.servicos.findUnique({ where: { Id_Servico: Number(Id_Servico) }, select: { Duracao: true } });
      if (!servico || !servico.Duracao) throw new Error('Serviço inválido');

      const horaInicioDate = new Date(Data + 'T' + HoraInicio + ':00');
      if (isNaN(horaInicioDate.getTime())) throw new Error('Hora de início inválida');
      const horaFinalDate = new Date(horaInicioDate);
      horaFinalDate.setMinutes(horaFinalDate.getMinutes() + servico.Duracao);

      const dataOnly = new Date(Data + 'T00:00:00');

      // Check for identical duplicate (another appointment of same cliente/service at same start) excluding this one
      const duplicado = await tx.agendamentos.findFirst({
        where: {
          Id_Cliente: cliente.Id_Cliente,
          Id_Servico: Number(Id_Servico),
          Data: dataOnly,
          HoraInicio: horaInicioDate,
          NOT: { Id_Agendamento: Number(Id_Agendamento) },
        },
      });
      if (duplicado) throw new Error('Já existe um agendamento para este horário.');

      // Check overlapping conflicts with other agendamentos for same service and (optional) funcionario
      const conflitos = await tx.agendamentos.findMany({
        where: {
          Data: dataOnly,
          Id_Servico: Number(Id_Servico),
          ...(Id_Funcionario ? { Id_Funcionario: Number(Id_Funcionario) } : {}),
          NOT: { Id_Agendamento: Number(Id_Agendamento) },
          OR: [
            {
              HoraInicio: { lt: horaFinalDate },
              HoraFinal: { gt: horaInicioDate },
            },
          ],
        },
      });
      if (conflitos.length > 0) throw new Error('Horário indisponível. Escolha outro horário.');

      // Perform update
      const atualizado = await tx.agendamentos.update({
        where: { Id_Agendamento: Number(Id_Agendamento) },
        data: {
          Id_Servico: Number(Id_Servico),
          Id_Funcionario: Id_Funcionario ?? null,
          Data: dataOnly,
          HoraInicio: horaInicioDate,
          HoraFinal: horaFinalDate,
          Observacoes: Observacoes ?? null,
        },
        include: { servicos: true, clientes: true, funcionarios: true },
      });

      return atualizado;
    });

    return NextResponse.json(resultado);

  } catch (error) {
    if (typeof error === 'object' && error && 'code' in error && (error as any).code === 'P2002') {
      console.error('Erro de duplicado ao editar agendamento:', error);
      return NextResponse.json({ error: 'Agendamento duplicado ao editar.' }, { status: 409 });
    }
    console.error('Erro ao atualizar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao atualizar agendamento' }, { status: 500 });
  }
}

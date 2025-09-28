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

    // Buscar duração do serviço
    const servico = await prisma.servicos.findUnique({
      where: { Id_Servico: Id_Servico },
      select: { Duracao: true, Nome: true },
    });

    if (!servico || !servico.Duracao) {
      return NextResponse.json({ error: 'Serviço não encontrado ou sem duração definida' }, { status: 400 });
    }

    // Converter HoraInicio em objeto Date apenas para hora
    const [hours, minutes] = HoraInicio.split(':').map(Number);
    if (hours == null || minutes == null) {
      return NextResponse.json({ error: 'Hora inválida' }, { status: 400 });
    }

    // Data completa do agendamento
    const dataAgendamento = new Date(`${Data}T${HoraInicio}:00`);
    if (isNaN(dataAgendamento.getTime())) {
      return NextResponse.json({ error: 'Data ou hora inválida' }, { status: 400 });
    }

    // Calcular HoraFinal com base na duração do serviço (em minutos)
    const horaFinalDate = new Date(dataAgendamento);
    horaFinalDate.setMinutes(horaFinalDate.getMinutes() + servico.Duracao);

    // HoraInicio e HoraFinal como objetos Date (apenas hora)
    const horaInicioDate = new Date(0, 0, 0, hours, minutes);
    const horaFinalOnly = new Date(0, 0, 0, horaFinalDate.getHours(), horaFinalDate.getMinutes());

    const novoAgendamento = await prisma.agendamentos.create({
      data: {
        Id_Servico,
        Id_Cliente: cliente.Id_Cliente,
        Id_Funcionario: Id_Funcionario ?? null,
        Data: dataAgendamento,
        HoraInicio: horaInicioDate,
        HoraFinal: horaFinalOnly,
        Observacoes: Observacoes ?? null,
      },
      include: {
        servicos: true,
        clientes: true,
        funcionarios: true,
      },
    });
    const emailHtml = `
  <h2>Confirmação de Agendamento</h2>
  <p><strong>Serviço:</strong> ${novoAgendamento.servicos.Nome}</p>
  <p><strong>Data:</strong> ${Data}</p>
  <p><strong>Hora:</strong> ${HoraInicio} - ${horaFinalOnly.getHours().toString().padStart(2, '0')}:${horaFinalOnly.getMinutes().toString().padStart(2, '0')}</p>
  ${novoAgendamento.funcionarios ? `<p><strong>Profissional:</strong> ${novoAgendamento.funcionarios.Nome}</p>` : ''}
  <p>Obrigado por escolher a ${process.env.APP_NAME}</p>
`;

    // Chama a rota de envio de email
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
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao criar agendamento' }, { status: 500 });
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

    // Atualiza o status do agendamento
    const agendamentoAtualizado = await prisma.agendamentos.update({
      where: { Id_Agendamento: Number(Id_Agendamento) },
      data: { Status },
      include: {
        servicos: {
          include: {
            produtos: true, // Supondo que existe relação servicos -> produtos
          },
        },
      },
    });

    // Se o status foi alterado para 'Realizado', diminui o estoque do produto associado ao serviço
    if (Status === "Realizado" && agendamentoAtualizado.servicos?.produtos?.Id_Produto) {
      const produtoId = agendamentoAtualizado.servicos.produtos.Id_Produto;

      // Diminui o estoque em 1, mas nunca abaixo de zero
      await prisma.produtos.update({
        where: { Id_Produto: produtoId },
        data: {
          Estoque: {
            decrement: 1,
          },
        },
      });
    }

    return NextResponse.json(agendamentoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao atualizar agendamento' }, { status: 500 });
  }
}
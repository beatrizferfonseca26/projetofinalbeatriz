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

    if (!Id_Servico || !Data || !HoraInicio || !Id_Cliente) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes (Id_Servico, Data, HoraInicio, Id_Cliente).' }, { status: 400 });
    }

    // Converter datas para formato ISO
    const dataISO = new Date(`${Data}T00:00:00Z`);
    const horaInicioISO = new Date(`${Data}T${HoraInicio}:00Z`);
    const horaFinalISO = HoraFinal ? new Date(`${Data}T${HoraFinal}:00Z`) : null;

    // Validar se as datas são válidas
    if (isNaN(dataISO.getTime()) || isNaN(horaInicioISO.getTime())) {
      return NextResponse.json({ error: 'Formato de data/hora inválido.' }, { status: 400 });
    }

    // Executar em transação para garantir consistência
    const resultado = await prisma.$transaction(async (tx) => {
      // 1. Verificar se o serviço existe e obter duração
      const servico = await tx.servicos.findUnique({
        where: { Id_Servico: Number(Id_Servico) },
        select: { Valor: true, Duracao: true, Nome: true },
      });
      if (!servico) {
        throw new Error('Serviço não encontrado.');
      }

      // 2. Verificar se o cliente existe
      const cliente = await tx.clientes.findUnique({
        where: { Id_Cliente: Number(Id_Cliente) },
        select: { Id_Cliente: true, Nome: true },
      });
      if (!cliente) {
        throw new Error('Cliente não encontrado.');
      }

      // 3. Calcular HoraFinal se não fornecida (baseada na duração do serviço)
      let horaFinalCalculada = horaFinalISO;
      if (!horaFinalCalculada && servico.Duracao) {
        horaFinalCalculada = new Date(horaInicioISO);
        horaFinalCalculada.setMinutes(horaFinalCalculada.getMinutes() + servico.Duracao);
      }

      // 4. Verificar conflitos de agendamento
      const conflitos = await tx.agendamentos.findMany({
        where: {
          Data: dataISO,
          Id_Funcionario: funcionario.Id_Funcionario,
          OR: [
            {
              HoraInicio: { lt: horaFinalCalculada || horaInicioISO },
              HoraFinal: { gt: horaInicioISO },
            },
          ],
        },
      });

      if (conflitos.length > 0) {
        throw new Error('Já existe agendamento conflitante neste horário.');
      }

      // 5. Verificar duplicatas para o mesmo cliente
      const duplicata = await tx.agendamentos.findFirst({
        where: {
          Id_Cliente: Number(Id_Cliente),
          Data: dataISO,
          HoraInicio: horaInicioISO,
        },
      });

      if (duplicata) {
        throw new Error('Cliente já possui agendamento neste dia e horário.');
      }

      // 6. Criar o agendamento
      const agendamento = await tx.agendamentos.create({
        data: {
          Id_Servico: Number(Id_Servico),
          Id_Funcionario: funcionario.Id_Funcionario,
          Id_Cliente: Number(Id_Cliente),
          Data: dataISO,
          HoraInicio: horaInicioISO,
          HoraFinal: horaFinalCalculada,
          Observacoes: Observacoes ?? null,
          Status: 'Marcado', // Status inicial padrão
        },
      });

      // 7. Criar o pagamento associado
      const pagamento = await tx.pagamentos.create({
        data: {
          Id_Agendamento: agendamento.Id_Agendamento,
          Modalidade: Modalidade || 'Presencial',
          Valor: Valor ? Number(Valor) : servico.Valor,
          Status: 'NOK', // Status inicial para pagamento
        },
      });

      return { agendamento, pagamento, servico, cliente };
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Agendamento criado com sucesso.',
        agendamento: resultado.agendamento,
        pagamento: resultado.pagamento,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('POST /api/interna/funcionarios/agendamentos error', err);
    
    // Tratamento de erros específicos
    if (err.message?.includes('Serviço não encontrado')) {
      return NextResponse.json({ error: 'Serviço não encontrado.' }, { status: 404 });
    }
    if (err.message?.includes('Cliente não encontrado')) {
      return NextResponse.json({ error: 'Cliente não encontrado.' }, { status: 404 });
    }
    if (err.message?.includes('conflitante') || err.message?.includes('já possui')) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'Agendamento duplicado detectado.' }, { status: 409 });
    }
    
    return NextResponse.json({ error: 'Erro interno ao criar agendamento.' }, { status: 500 });
  }
}

// PUT — atualiza status do agendamento
export async function PUT(request: Request) {
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

    const body = await request.json();
    const { Id_Agendamento, Status } = body;

    if (!Id_Agendamento || !Status) {
      return NextResponse.json({ error: 'Id_Agendamento e Status são obrigatórios' }, { status: 400 });
    }

    // Validar se o status é válido
    const statusValidos = ['Marcado', 'Confirmado', 'Realizado', 'Cancelado'];
    if (!statusValidos.includes(Status)) {
      return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
    }

    // Executar em transação para garantir consistência
    const resultado = await prisma.$transaction(async (tx) => {
      // 1. Verificar se o agendamento existe e pertence ao funcionário
      const agendamento = await tx.agendamentos.findFirst({
        where: {
          Id_Agendamento: Number(Id_Agendamento),
          Id_Funcionario: funcionario.Id_Funcionario,
        },
        include: {
          servicos: {
            include: {
              produtos: true,
            },
          },
        },
      });

      if (!agendamento) {
        throw new Error('Agendamento não encontrado ou não pertence a este funcionário');
      }

      // 2. Atualizar o agendamento
      const agendamentoAtualizado = await tx.agendamentos.update({
        where: { Id_Agendamento: Number(Id_Agendamento) },
        data: { Status },
      });

      // 3. Se o status mudou para "Realizado", reduzir estoque do produto (se aplicável)
      if (Status === 'Realizado' && agendamento.servicos?.produtos?.Id_Produto) {
        const produto = agendamento.servicos.produtos;
        if (produto.Estoque && produto.Estoque > 0) {
          await tx.produtos.update({
            where: { Id_Produto: produto.Id_Produto },
            data: { Estoque: produto.Estoque - 1 },
          });
        }
      }

      return agendamentoAtualizado;
    });

    return NextResponse.json({
      success: true,
      message: 'Status do agendamento atualizado com sucesso',
      agendamento: resultado,
    });
  } catch (err: any) {
    console.error('PUT /api/interna/funcionarios/agendamentos error', err);
    
    if (err.message?.includes('não encontrado') || err.message?.includes('não pertence')) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    
    return NextResponse.json({ error: 'Erro interno ao atualizar agendamento' }, { status: 500 });
  }
}
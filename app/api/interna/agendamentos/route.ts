import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { NextRequest } from 'next/server';

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
        clientes: true,
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
  console.log('POST /api/interna/agendamentos chamado', Date.now(), 'body preview:', await request.clone().text().catch(()=>null));

  try {
    // 1️⃣ Verificar sessão
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // 2️⃣ Buscar cliente pelo e-mail logado
    const cliente = await prisma.clientes.findFirst({
      where: { Email: session.user.email },
      select: { Id_Cliente: true },
    });
    if (!cliente) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    // 3️⃣ Extrair e validar o corpo da requisição
    const body = await request.json();
    const {
      Id_Servico,
      Data,
      HoraInicio,
      HoraFinal,
      Id_Funcionario = null,
      Observacoes = null,
      ModalidadePagamento = null,
    } = body;

    if (!Id_Servico || !Data || !HoraInicio) {
      return NextResponse.json({ error: 'Campos obrigatórios em falta.' }, { status: 400 });
    }

    // 4️⃣ Converter datas/horas para ISO
    const dataISO = new Date(`${Data}T00:00:00Z`);
    const horaInicioISO = new Date(`${Data}T${HoraInicio}:00Z`);
    const horaFinalISO = HoraFinal ? new Date(`${Data}T${HoraFinal}:00Z`) : null;

    // 5️⃣ Transação Prisma com bloqueio lógico
    const novoAgendamento = await prisma.$transaction(
      async (tx) => {
        // Checar se já existe agendamento igual
        const existente = await tx.agendamentos.findFirst({
          where: {
            Id_Cliente: cliente.Id_Cliente,
            Data: dataISO,
            HoraInicio: horaInicioISO,
          },
          select: { Id_Agendamento: true },
        });

        if (existente) throw new Error('DUPLICATE_AGENDAMENTO');

        // Buscar valor do serviço dentro da transação
        const servico = await tx.servicos.findUnique({
          where: { Id_Servico: Number(Id_Servico) },
          select: { Valor: true },
        });

        // Criar agendamento
        const created = await tx.agendamentos.create({
          data: {
            Id_Cliente: cliente.Id_Cliente,
            Id_Servico: Number(Id_Servico),
            Id_Funcionario: Id_Funcionario ? Number(Id_Funcionario) : null,
            Data: dataISO,
            HoraInicio: horaInicioISO,
            HoraFinal: horaFinalISO,
            Observacoes: Observacoes ?? null,
            Status: 'Marcado',
          },
        });

        // Criar pagamento atrelado (tudo na mesma transação)
        await tx.pagamentos.create({
          data: {
            Id_Agendamento: created.Id_Agendamento,
            Modalidade: ModalidadePagamento ?? 'Presencial',
            Valor: servico?.Valor ?? 0,
            Status: 'OK',
          },
        });

        return created;
      },
      {
        // Isolamento SERIALIZABLE = impede race conditions de duplicação
        isolationLevel: 'Serializable',
      }
    );

    return NextResponse.json(
      { success: true, agendamento: novoAgendamento },
      { status: 201 }
    );
  } catch (err: any) {
    // 6️⃣ Tratamento de erros conhecidos
    if (err?.message === 'DUPLICATE_AGENDAMENTO') {
      return NextResponse.json(
        { error: 'Já existe agendamento neste dia/horário para este cliente.' },
        { status: 409 }
      );
    }

    if (err?.code === 'P2002') {
      // Erro de unique constraint do Prisma
      return NextResponse.json(
        { error: 'Agendamento duplicado detectado (conflito).' },
        { status: 409 }
      );
    }

    console.error('❌ Erro ao criar agendamento:', err);
    return NextResponse.json(
      { error: 'Erro interno ao criar agendamento.' },
      { status: 500 }
    );
  }
}

// PUT: Atualizar status do agendamento e ajustar estoque do produto se necessário
export async function PUT(request: Request) {
  try {
    console.log('PUT /api/interna/agendamentos chamado');
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log('PUT: Não autenticado');
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    console.log('PUT: Body recebido:', body);

    // If the request includes only Status and Id_Agendamento, keep legacy status-only path
    if (body.Id_Agendamento && body.Status && Object.keys(body).length === 2) {
      console.log('PUT: Rota de atualização de status simples');
      const { Id_Agendamento, Status } = body;
      
      // Validar status conforme enum da base de dados
      const statusValidos = ['Realizado', 'Confirmado', 'Cancelado', 'Marcado'];
      if (!statusValidos.includes(Status)) {
        console.log('PUT: Status inválido:', Status);
        return NextResponse.json({ 
          error: `Status inválido. Valores permitidos: ${statusValidos.join(', ')}` 
        }, { status: 400 });
      }

      console.log('PUT: Iniciando transação para atualizar status:', Status);

      // Executar em transação para gerenciar estoque
      const agendamentoAtualizado = await prisma.$transaction(async (tx) => {
        // Buscar agendamento atual com dados do serviço e produto
        const agendamentoAtual = await tx.agendamentos.findUnique({
          where: { Id_Agendamento: Number(Id_Agendamento) },
          include: {
            servicos: {
              include: {
                produtos: true,
              },
            },
          },
        });

        if (!agendamentoAtual) {
          throw new Error('Agendamento não encontrado');
        }

        // Atualizar o status do agendamento
        const agendamentoAtualizado = await tx.agendamentos.update({
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

        // Se o status mudou para "Realizado", diminuir estoque do produto
        if (Status === 'Realizado' && agendamentoAtual.Status !== 'Realizado') {
          const produto = agendamentoAtualizado.servicos?.produtos;
          
          if (produto && produto.Estoque !== null && produto.Estoque > 0) {
            await tx.produtos.update({
              where: { Id_Produto: produto.Id_Produto },
              data: { 
                Estoque: produto.Estoque - 1 
              },
            });
            
            console.log(`Estoque do produto ${produto.Nome} diminuído de ${produto.Estoque} para ${produto.Estoque - 1}`);
          }
        }

        return agendamentoAtualizado;
      });

      return NextResponse.json(agendamentoAtualizado);
    }

    // Otherwise, treat as a full edit: Id_Agendamento, Id_Servico, Data, HoraInicio, optional Id_Funcionario, Observacoes
    console.log('PUT: Rota de edição completa de agendamento');
    const { Id_Agendamento, Id_Servico, Data, HoraInicio, Id_Funcionario, Observacoes } = body;
    if (!Id_Agendamento || !Id_Servico || !Data || !HoraInicio) {
      console.log('PUT: Dados incompletos para edição');
      return NextResponse.json({ error: 'Dados incompletos para edição' }, { status: 400 });
    }

    // Run in transaction: validate client ownership, service duration, compute HoraFinal, check conflicts, then update
    const resultado = await prisma.$transaction(async (tx) => {
      const ag = await tx.agendamentos.findUnique({ where: { Id_Agendamento: Number(Id_Agendamento) } });
      if (!ag) throw new Error('Agendamento não encontrado');

      // Verificar se é cliente, funcionário ou administrador
      const sessionEmail = session.user.email;
      const cliente = await tx.clientes.findFirst({ where: { Email: sessionEmail } });
      const funcionario = await tx.funcionarios.findFirst({ where: { Email: sessionEmail } });

      // Se for cliente, só pode editar seus próprios agendamentos
      if (cliente && !funcionario) {
        if (ag.Id_Cliente !== cliente.Id_Cliente) {
          throw new Error('Não autorizado a editar este agendamento');
        }
      }
      // Se não for nem cliente nem funcionário, não autorizar
      else if (!funcionario) {
        throw new Error('Usuário não encontrado');
      }
      // Funcionários/administradores podem editar qualquer agendamento

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
          ...(cliente ? { Id_Cliente: cliente.Id_Cliente } : {}),
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

  } catch (error: any) {
    console.error('Erro ao atualizar agendamento:', error);

    // Tratamento de erros específicos
    if (error?.message === 'Agendamento não encontrado') {
      return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
    }
    if (error?.message === 'Cliente não encontrado') {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }
    if (error?.message?.includes('Não autorizado')) {
      return NextResponse.json({ error: 'Não autorizado a editar este agendamento' }, { status: 403 });
    }
    if (error?.message?.includes('Serviço inválido')) {
      return NextResponse.json({ error: 'Serviço inválido' }, { status: 400 });
    }
    if (error?.message?.includes('Hora de início inválida')) {
      return NextResponse.json({ error: 'Formato de hora inválido' }, { status: 400 });
    }
    if (error?.message?.includes('já existe')) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    if (error?.message?.includes('indisponível')) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Agendamento duplicado detectado.' }, { status: 409 });
    }
    
    return NextResponse.json({ error: 'Erro interno ao atualizar agendamento' }, { status: 500 });
  }
}

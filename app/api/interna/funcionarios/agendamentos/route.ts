import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// GET → buscar agendamentos de um funcionário pelo email
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
    }

    const funcionario = await prisma.funcionarios.findFirst({
      where: { Email: email },
    });

    if (!funcionario) {
      return NextResponse.json({ error: 'Funcionário não encontrado' }, { status: 404 });
    }

    const agendamentos = await prisma.agendamentos.findMany({
      where: { Id_Funcionario: funcionario.Id_Funcionario },
      include: {
        clientes: true,
        servicos: true,
      },
    });

    // 🔹 Formatar horas antes de enviar
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
        ...ag,
        HoraInicio: horaInicio,
        HoraFinal: horaFinal,
      };
    });

    return NextResponse.json(agendamentosFormatados);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}

// PUT → atualizar status do agendamento e dar baixa no estoque caso "Realizado"
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

    // Atualiza o status e carrega os produtos relacionados ao serviço
    const agendamentoAtualizado = await prisma.agendamentos.update({
      where: { Id_Agendamento: Number(Id_Agendamento) },
      data: { Status },
      include: {
        servicos: {
          include: {
            produtos: true, // <- se for N:N, isso traz a lista de produtos
          },
        },
      },
    });

    // 🔹 Se foi "Realizado", dar baixa no estoque
    if (Status === "Realizado" && agendamentoAtualizado.servicos?.produtos) {
      const produto = agendamentoAtualizado.servicos.produtos;

      await prisma.produtos.update({
        where: { Id_Produto: produto.Id_Produto },
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

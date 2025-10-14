import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    // Recupera a sessão do usuário logado
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Verifica se é um cliente autenticado
    const cliente = await prisma.clientes.findFirst({
      where: { Email: session.user.email },
      select: { Id_Cliente: true },
    });

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    // Busca todos os agendamentos do cliente logado, incluindo dados do serviço e funcionário
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
        Cliente: null,
        Observacoes: ag.Observacoes || null,
      };
    });
    return NextResponse.json({ agendamentos: agendamentosFormatados });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}

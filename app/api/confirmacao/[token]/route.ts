import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Processar confirmação via token
export async function GET(request: Request, { params }: { params: { token: string } }) {
  try {
    const { token } = params;

    if (!token) {
      return NextResponse.json({ error: 'Token é obrigatório' }, { status: 400 });
    }

    // Buscar agendamento pelo token
    const agendamento = await prisma.agendamentos.findFirst({
      where: { 
        ConfirmationToken: token,
      } as any, // usando 'as any' porque o campo pode não estar no schema
      include: {
        clientes: true,
        servicos: true,
        funcionarios: true,
      },
    });

    if (!agendamento) {
      return NextResponse.json({ 
        error: 'Token inválido ou agendamento não encontrado' 
      }, { status: 404 });
    }

    // Verificar se o token expirou
    const tokenExpiresAt = (agendamento as any).TokenExpiresAt;
    if (tokenExpiresAt && new Date() > new Date(tokenExpiresAt)) {
      return NextResponse.json({ 
        error: 'Token expirado. Solicite uma nova confirmação.',
        expired: true,
      }, { status: 410 });
    }

    // Verificar se já foi confirmado
    if (agendamento.Status === 'Confirmado') {
      return NextResponse.json({
        message: 'Agendamento já foi confirmado anteriormente',
        alreadyConfirmed: true,
        agendamento: {
          Id_Agendamento: agendamento.Id_Agendamento,
          cliente: agendamento.clientes?.Nome,
          servico: agendamento.servicos?.Nome,
          data: agendamento.Data,
          hora: agendamento.HoraInicio,
          profissional: agendamento.funcionarios?.Nome,
        },
      });
    }

    // Confirmar o agendamento
    const agendamentoConfirmado = await prisma.agendamentos.update({
      where: { Id_Agendamento: agendamento.Id_Agendamento },
      data: { 
        Status: 'Confirmado',
        ConfirmedAt: new Date(),
        ConfirmationToken: null, // limpar token após uso
      } as any,
    });

    return NextResponse.json({
      success: true,
      message: 'Agendamento confirmado com sucesso!',
      agendamento: {
        Id_Agendamento: agendamentoConfirmado.Id_Agendamento,
        cliente: agendamento.clientes?.Nome,
        servico: agendamento.servicos?.Nome,
        data: agendamentoConfirmado.Data,
        hora: agendamentoConfirmado.HoraInicio,
        profissional: agendamento.funcionarios?.Nome,
        status: agendamentoConfirmado.Status,
      },
    });

  } catch (error) {
    console.error('Erro ao processar confirmação:', error);
    return NextResponse.json({
      error: 'Erro interno do servidor',
      details: String(error),
    }, { status: 500 });
  }
}
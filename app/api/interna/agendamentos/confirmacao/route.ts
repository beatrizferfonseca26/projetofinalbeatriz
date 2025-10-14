import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// POST - Enviar confirmação via SMS/WhatsApp
export async function POST(request: Request) {
  try {
    const { Id_Agendamento } = await request.json();

    if (!Id_Agendamento) {
      return NextResponse.json({ error: 'Id_Agendamento é obrigatório' }, { status: 400 });
    }

    // Buscar agendamento com cliente e serviço
    const agendamento = await prisma.agendamentos.findUnique({
      where: { Id_Agendamento: Number(Id_Agendamento) },
      include: {
        clientes: true,
        servicos: true,
        funcionarios: true,
      },
    });

    if (!agendamento) {
      return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
    }

    if (!agendamento.clientes?.Telemovel) {
      return NextResponse.json({ error: 'Cliente não possui telefone cadastrado' }, { status: 400 });
    }

    // Gerar token único para confirmação
    const confirmationToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token expira em 24 horas

    // Salvar token na base de dados
    await prisma.agendamentos.update({
      where: { Id_Agendamento: Number(Id_Agendamento) },
      data: { 
        ConfirmationToken: confirmationToken,
        TokenExpiresAt: expiresAt,
      } as any, // usando 'as any' porque estes campos podem não estar no schema ainda
    });

    // Criar link de confirmação
    const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/confirmacao/${confirmationToken}`;

    // Formatar data e hora
    const dataFormatada = agendamento.Data 
      ? new Date(agendamento.Data).toLocaleDateString('pt-PT')
      : 'Data não definida';
    
    const horaFormatada = agendamento.HoraInicio
      ? agendamento.HoraInicio.toString().slice(0, 5)
      : 'Hora não definida';

    // Mensagem para WhatsApp
    const mensagem = `Olá ${agendamento.clientes.Nome}! 

📅 Confirmação de Agendamento
🏢 Serviço: ${agendamento.servicos?.Nome}
📅 Data: ${dataFormatada}
⏰ Hora: ${horaFormatada}
👨‍💼 Profissional: ${agendamento.funcionarios?.Nome || 'A definir'}

Para confirmar seu agendamento, clique no link:
${confirmationLink}

⚠️ Este link expira em 24 horas.

Caso não consiga clicar, copie e cole o link no seu navegador.`;

    // Enviar WhatsApp
    try {
      const whatsappResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/externa/whatsApp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telefone: agendamento.clientes.Telemovel,
          mensagem: mensagem,
          agendamentoId: Id_Agendamento,
        }),
      });

      if (!whatsappResponse.ok) {
        console.error('Erro ao enviar WhatsApp:', await whatsappResponse.text());
        throw new Error('Falha no envio do WhatsApp');
      }

      // Marcar como enviado
      await prisma.agendamentos.update({
        where: { Id_Agendamento: Number(Id_Agendamento) },
        data: { 
          ConfirmationSent: true,
          ConfirmationSentAt: new Date(),
        } as any,
      });

      return NextResponse.json({
        success: true,
        message: 'Confirmação enviada com sucesso',
        confirmationToken,
        telefone: agendamento.clientes.Telemovel,
      });

    } catch (whatsappError) {
      console.error('Erro específico do WhatsApp:', whatsappError);
      
      // Tentar enviar por Email como fallback
      try {
        const emailHtml = `
          <h2>Confirmação de Agendamento</h2>
          <p>Olá, ${agendamento.clientes.Nome}!</p>
          <p><strong>Serviço:</strong> ${agendamento.servicos?.Nome}</p>
          <p><strong>Data:</strong> ${dataFormatada}</p>
          <p><strong>Hora:</strong> ${horaFormatada}</p>
          <p><strong>Profissional:</strong> ${agendamento.funcionarios?.Nome || 'A definir'}</p>
          <p>Para confirmar seu agendamento, <a href="${confirmationLink}">clique aqui</a>.</p>
          <p><em>Este link expira em 24 horas.</em></p>
        `;

        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/interna/email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: agendamento.clientes.Email,
            subject: 'Confirmação de Agendamento',
            html: emailHtml,
          }),
        });

        return NextResponse.json({
          success: true,
          message: 'WhatsApp falhou, mas confirmação enviada por email',
          method: 'email',
          confirmationToken,
        });

      } catch (emailError) {
        console.error('Erro no email fallback:', emailError);
        return NextResponse.json({
          error: 'Falha ao enviar confirmação via WhatsApp e Email',
          details: String(whatsappError),
        }, { status: 500 });
      }
    }

  } catch (error) {
    console.error('Erro na API de confirmação:', error);
    return NextResponse.json({
      error: 'Erro interno do servidor',
      details: String(error),
    }, { status: 500 });
  }
}

// GET - Verificar status de confirmação
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const Id_Agendamento = searchParams.get('Id_Agendamento');

    if (!Id_Agendamento) {
      return NextResponse.json({ error: 'Id_Agendamento é obrigatório' }, { status: 400 });
    }

    const agendamento = await prisma.agendamentos.findUnique({
      where: { Id_Agendamento: Number(Id_Agendamento) },
      select: {
        Id_Agendamento: true,
        Status: true,
        ConfirmationSent: true,
        ConfirmationSentAt: true,
        TokenExpiresAt: true,
      } as any,
    });

    if (!agendamento) {
      return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      Id_Agendamento: agendamento.Id_Agendamento,
      Status: agendamento.Status,
      confirmationSent: (agendamento as any).ConfirmationSent || false,
      confirmationSentAt: (agendamento as any).ConfirmationSentAt,
      tokenExpired: (agendamento as any).TokenExpiresAt ? new Date() > new Date((agendamento as any).TokenExpiresAt) : false,
    });

  } catch (error) {
    console.error('Erro ao verificar status de confirmação:', error);
    return NextResponse.json({
      error: 'Erro interno do servidor',
    }, { status: 500 });
  }
}
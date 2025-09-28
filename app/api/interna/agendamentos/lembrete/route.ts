// src/app/api/interna/agendamentos/lembrete/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const now = new Date();
        const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        // Busca agendamentos entre 24h e 25h a partir de agora (janela de 1h)
        const agendamentos = await prisma.agendamentos.findMany({
            where: {
                Data: {
                    gte: in24h,
                    lt: new Date(in24h.getTime() + 60 * 60 * 1000),
                },
            },
            include: {
                clientes: true,
                servicos: true,
            },
        });

        for (const ag of agendamentos) {
            const cliente = ag.clientes;
            const servico = ag.servicos;

            if (!cliente?.Email) continue;

            const emailHtml = `
  <h2>Lembrete de Agendamento</h2>
  <p>Olá, ${cliente.Nome}!</p>
  <p>Este é um lembrete do seu agendamento:</p>
  <p><strong>Serviço:</strong> ${servico.Nome}</p>
  <p><strong>Data:</strong> ${ag.Data ? ag.Data.toLocaleDateString() : 'Sem data'}</p>
  <p><strong>Hora:</strong> ${ag.HoraInicio ? ag.HoraInicio.toString().slice(0, 5) : '-'}</p>
  <p>Nos vemos em breve! — ${process.env.APP_NAME}</p>
`;


            // Dispara email
            await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/interna/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: cliente.Email,
                    subject: `Lembrete: agendamento amanhã - ${process.env.APP_NAME}`,
                    html: emailHtml,
                }),
            });

            // Se quiser SMS → integrar aqui com Twilio, etc.
        }

        return NextResponse.json({ message: 'Lembretes enviados', count: agendamentos.length });
    } catch (error) {
        console.error('Erro ao enviar lembretes:', error);
        return NextResponse.json({ error: 'Erro ao enviar lembretes' }, { status: 500 });
    }
}

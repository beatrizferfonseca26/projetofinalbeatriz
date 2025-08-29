// app/api/externa/whatsApp/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Twilio from "twilio";

// Configurações Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const whatsappFrom = "whatsapp:" + process.env.TWILIO_WHATSAPP_FROM!; // ex: "whatsapp:+14155238886"
const client = Twilio(accountSid, authToken);

interface Body {
  agendamentoId: number;
  mensagem?: string; // mensagem customizável
  enviarAntesMinutos?: number; // tempo antes do agendamento para enviar
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    // Buscar agendamento
    const agendamento = await prisma.agendamentos.findUnique({
      where: { Id_Agendamento: body.agendamentoId },
    });

    if (!agendamento) return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });

    // Buscar cliente pelo Id_Cliente do agendamento
    const cliente = await prisma.clientes.findUnique({
      where: { Id_Cliente: agendamento.Id_Cliente },
    });

    if (!cliente || !cliente.Telemovel) {
      return NextResponse.json({ error: "Telefone do cliente não encontrado" }, { status: 400 });
    }

    const telefone = cliente.Telemovel;
    const horarioAgendamento = agendamento.Data; // ou Data + HoraInicio dependendo do schema
    const enviarAntes = body.enviarAntesMinutos ?? 60; // padrão 60 min antes

    // Calcula horário de envio
    const agora = new Date();
    const horarioEnvio = new Date(horarioAgendamento!.getTime() - enviarAntes * 60 * 1000);

    const mensagemPadrao = body.mensagem || `Olá ${cliente.Nome}, seu agendamento está confirmado para ${horarioAgendamento?.toLocaleString()}`;

    if (horarioEnvio <= agora) {
      // Envia imediatamente
      await client.messages.create({
        from: whatsappFrom,
        to: `whatsapp:${telefone}`,
        body: mensagemPadrao,
      });
      return NextResponse.json({ success: true, enviadoImediatamente: true });
    }

    // Agendar envio futuro (em produção, use cron job ou queue)
    setTimeout(async () => {
      await client.messages.create({
        from: whatsappFrom,
        to: `whatsapp:${telefone}`,
        body: mensagemPadrao,
      });
    }, horarioEnvio.getTime() - agora.getTime());

    return NextResponse.json({ success: true, agendadoPara: horarioEnvio.toISOString() });
  } catch (err) {
    console.error("Erro ao enviar WhatsApp:", err);
    return NextResponse.json({ error: "Erro ao enviar WhatsApp" }, { status: 500 });
  }
}

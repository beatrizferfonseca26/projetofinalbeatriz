import cron from "node-cron";
import { prisma } from "@/lib/prisma";
import { sendWhatsApp } from "@/lib/messaging";

cron.schedule("0 20 * * *", async () => {
  try {
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);

    // Buscar agendamentos de amanhã que ainda não receberam lembrete
    const agendamentos = await prisma.agendamentos.findMany({
      where: {
        LembreteEnviado: false,
        Data: {
          gte: new Date(amanha.setHours(0, 0, 0, 0)),
          lt: new Date(amanha.setHours(23, 59, 59, 999)),
        },
      },
      include: {
        clientes: { select: { Nome: true, Telemovel: true } },
        servicos: { select: { Nome: true } },
      },
    });

    if (agendamentos.length === 0) {
        console.log("Nenhum agendamento para lembrar amanhã.");
    }

    for (const ag of agendamentos) {
      const numeroCliente = ag.clientes?.Telemovel;
      if (!numeroCliente) continue;

      const to = numeroCliente.startsWith("+")
        ? numeroCliente
        : `+351${numeroCliente.replace(/\D/g, "")}`;

      const mensagem = `
Olá ${ag.clientes.Nome} 👋
Lembramos que tem um agendamento para *${ag.servicos.Nome}*
amanhã, dia ${new Date(ag.Data!).toLocaleDateString("pt-PT")} às ${ag.HoraInicio}.

📍 Sallon
☎️ 913 426 124
Até breve 💅
`;

      // Enviar via WhatsApp (podes trocar por sendSMS)
      await sendWhatsApp(to, mensagem);

      // Atualizar flag
      await prisma.agendamentos.update({
        where: { Id_Agendamento: ag.Id_Agendamento },
        data: { LembreteEnviado: true },
      });
    }

  } catch (error: any) {
    console.error("Erro no job de lembretes:", error);
  }
});
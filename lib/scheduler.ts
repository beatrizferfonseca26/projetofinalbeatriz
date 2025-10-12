import cron from "node-cron";
import { prisma } from "@/lib/prisma";
import { sendSMS, sendWhatsApp } from "./messaging";

export function startScheduler() {
  // Executa a cada 5 minutos
  cron.schedule("*/5 * * * *", async () => {
    console.log("[CRON] Verificando agendamentos...");

    const now = new Date();
    const hourAhead = new Date(now.getTime() + 60 * 60 * 1000); // 1h antes

    const agendamentos = await prisma.agendamentos.findMany({
      where: {
        LembreteEnviado: false,
        Data: {
          gte: now,
          lte: hourAhead,
        },
      },
      include: { clientes: true },
    });

    for (const ag of agendamentos) {
      if (!ag.clientes?.Telemovel) continue;

      const msg = `Olá ${ag.clientes.Nome}, lembramos que você tem um agendamento às ${ag.HoraInicio}.`

      
      try {
        // Se tiver WhatsApp: usa WhatsApp, senão SMS
        if (ag.clientes.Telemovel.startsWith("+55")) {
          await sendWhatsApp(ag.clientes.Telemovel, msg);
        } else {
          await sendSMS(ag.clientes.Telemovel, msg);
        }

        await prisma.agendamentos.update({
          where: { Id_Agendamento: ag.Id_Agendamento },
          data: { LembreteEnviado: true },
        });

        console.log(`Lembrete enviado para ${ag.clientes.Nome}`);
      } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
      }
    }
  });
}

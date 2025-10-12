// lib/messaging.ts
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Envia uma mensagem via SMS.
 * @param to Número de telefone do destinatário (Ex: +3519XXXXXXXX)
 * @param message Conteúdo da mensagem
 */
export async function sendSMS(to: string, message: string) {
  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER!,
      to,
      body: message,
    });
    console.log("✅ SMS enviado com sucesso:", response.sid);
    return response;
  } catch (error: any) {
    console.error("❌ Erro ao enviar SMS:", error.message);
    throw new Error(error.message);
  }
}

/**
 * Envia uma mensagem via WhatsApp.
 * @param to Número de telefone do destinatário (Ex: +3519XXXXXXXX)
 * @param message Conteúdo da mensagem
 */
export async function sendWhatsApp(to: string, message: string) {
  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: `whatsapp:${to}`,
      body: message,
    });
    console.log("✅ WhatsApp enviado com sucesso:", response.sid);
    return response;
  } catch (error: any) {
    console.error("❌ Erro ao enviar WhatsApp:", error.message);
    throw new Error(error.message);
  }
}

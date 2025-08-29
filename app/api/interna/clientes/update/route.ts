import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // <-- import corrigido para o arquivo separado
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  // ✅ Obtém sessão do usuário
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "cliente") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = Number((session as any).id); // garante que o ID seja numérico

    if (!id) {
      return NextResponse.json({ error: "ID do cliente não encontrado" }, { status: 400 });
    }

    // Atualiza somente os campos enviados
    const updateData: any = {};
    if (body.nome) updateData.Nome = body.nome;
    if (body.morada) updateData.Morada = body.morada;
    if (body.telefone) updateData.Telemovel = body.telefone;
    if (body.senha) updateData.Senha = bcrypt.hashSync(body.senha, 10); // hash automático

    const clienteAtualizado = await prisma.clientes.update({
      where: { Id_Cliente: id },
      data: updateData,
    });

    return NextResponse.json({ success: true, cliente: clienteAtualizado });
  } catch (err) {
    console.error("Erro ao atualizar cliente:", err);
    return NextResponse.json({ error: "Erro ao atualizar cliente" }, { status: 500 });
  }
}

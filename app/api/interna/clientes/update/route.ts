import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "cliente") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = Number((session as any).id);

    if (!id) {
      return NextResponse.json(
        { error: "ID do cliente não encontrado" },
        { status: 400 }
      );
    }

    // 🔹 Buscar dados atuais do cliente
    const clienteAtual = await prisma.clientes.findUnique({
      where: { Id_Cliente: id },
    });

    if (!clienteAtual) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    // 🔹 Montar dados somente se forem diferentes
    const updateData: any = {};

    if (body.nome && body.nome !== clienteAtual.Nome) {
      updateData.Nome = body.nome;
    }

    if (body.morada && body.morada !== clienteAtual.Morada) {
      updateData.Morada = body.morada;
    }

    if (body.telefone && body.telefone !== clienteAtual.Telemovel) {
      updateData.Telemovel = body.telefone;
    }

    if (body.senha) {
      const senhaMatch = bcrypt.compareSync(body.senha, clienteAtual.Senha ?? "");
      if (!senhaMatch) {
        updateData.Senha = bcrypt.hashSync(body.senha, 10);
      }
    }


    // 🔹 Se nenhum campo mudou, retorna aviso
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        success: false,
        message: "Nenhuma alteração detectada.",
      });
    }

    // 🔹 Atualiza no banco
    const clienteAtualizado = await prisma.clientes.update({
      where: { Id_Cliente: id },
      data: updateData,
    });

    return NextResponse.json({ success: true, cliente: clienteAtualizado });
  } catch (err) {
    console.error("Erro ao atualizar cliente:", err);
    return NextResponse.json(
      { error: "Erro ao atualizar cliente" },
      { status: 500 }
    );
  }
}

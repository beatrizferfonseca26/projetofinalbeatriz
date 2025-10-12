import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // ajuste se necessário
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
    }

    const body = await req.json();
    console.log("PUT /api/interna/clientes/update body:", body);

    // montar data de update apenas com campos válidos
    const data: any = {};
    if (body.Nome != null) data.Nome = body.Nome;
    if (body.Email != null) data.Email = body.Email;
    if (body.Telemovel != null) data.Telemovel = body.Telemovel;
    if (body.Morada != null) data.Morada = body.Morada;
    if (body.Nif != null) data.Nif = Number(body.Nif);

    // DataNascimento: aceitar string ISO ou null
    if (body.DataNascimento) {
      const d = new Date(body.DataNascimento);
      if (!isNaN(d.getTime())) data.DataNascimento = d;
    } else if (body.DataNascimento === null) {
      data.DataNascimento = null;
    }

    // Senha: hash apenas se fornecida e não vazia
    if (body.Senha) {
      const salt = await bcrypt.genSalt(10);
      data.Senha = await bcrypt.hash(body.Senha, salt);
    }

    // localizar cliente pelo email da sessão (Email não é campo unique no schema gerado)
    const existing = await prisma.clientes.findFirst({
      where: { Email: session.user.email },
      select: { Id_Cliente: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Cliente não encontrado." }, { status: 404 });
    }

    // atualizar pelo Id_Cliente (unique)
    const updated = await prisma.clientes.update({
      where: { Id_Cliente: existing.Id_Cliente },
      data,
      select: {
        Id_Cliente: true,
        Nome: true,
        Email: true,
        Telemovel: true,
        DataNascimento: true,
        Morada: true,
        Nif: true,
      },
    });

    return NextResponse.json({ success: true, cliente: updated });
  } catch (err: any) {
    console.error("PUT /api/interna/clientes/update error:", err);
    // conflito de e-mail único
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "Email já em uso." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao atualizar cliente." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

// 🔹 Atualizar funcionário específico
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const isAdmin =
    !!session &&
    (Boolean((session.user as any)?.isAdmin) ||
      (session.user as any)?.tipo === "administrador" ||
      (session as any)?.tipo === "administrador");
  if (!isAdmin) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { nome, email, telefone, senha, administrador } = await req.json();

    const updateData: any = {
      Nome: nome,
      Email: email,
      Telefone: telefone,
      Administrador: administrador,
    };

    if (senha) {
      updateData.Senha = bcrypt.hashSync(senha, 10);
    }

    const funcionarioAtualizado = await prisma.funcionarios.update({
      where: { Id_Funcionario: Number(params.id) },
      data: updateData,
    });

    return NextResponse.json(funcionarioAtualizado, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar funcionário:", error);
    return NextResponse.json({ message: "Erro ao atualizar funcionário" }, { status: 500 });
  }
}

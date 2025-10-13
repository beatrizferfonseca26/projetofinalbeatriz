import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ✅ Obter cliente por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "administrador") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const cliente = await prisma.clientes.findUnique({
      where: { Id_Cliente: Number(params.id) },
      include: { agendamentos: true },
    });

    if (!cliente) {
      return NextResponse.json({ message: "Cliente não encontrado" }, { status: 404 });
    }

    return NextResponse.json(cliente, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    return NextResponse.json({ message: "Erro ao buscar cliente" }, { status: 500 });
  }
}

// ✅ Atualizar cliente
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "administrador") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const data = await req.json();

    const updateData: any = {
      Nome: data.Nome,
      Email: data.Email,
      Telemovel: data.Telemovel,
      Morada: data.Morada,
      DataNascimento: data.DataNascimento ? new Date(data.DataNascimento) : null,
      Nif: data.Nif ? Number(data.Nif) : null,
    };

    if (data.Senha) {
      updateData.Senha = bcrypt.hashSync(data.Senha, 10);
    }

    const clienteAtualizado = await prisma.clientes.update({
      where: { Id_Cliente: Number(params.id) },
      data: updateData,
    });

    return NextResponse.json(clienteAtualizado, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return NextResponse.json({ message: "Erro ao atualizar cliente" }, { status: 500 });
  }
}

// ✅ Eliminar cliente
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "administrador") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    await prisma.clientes.delete({
      where: { Id_Cliente: Number(params.id) },
    });

    return NextResponse.json({ message: "Cliente eliminado com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao eliminar cliente:", error);
    return NextResponse.json({ message: "Erro ao eliminar cliente" }, { status: 500 });
  }
}

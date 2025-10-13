import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ✅ Listar todos os clientes
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "administrador") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const clientes = await prisma.clientes.findMany({
      include: { agendamentos: true },
      orderBy: { Nome: "asc" },
    });

    return NextResponse.json(clientes, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    return NextResponse.json({ message: "Erro ao listar clientes" }, { status: 500 });
  }
}

// ✅ Criar novo cliente
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "administrador") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { nome, email, senha, telemovel, morada, dataNascimento, nif } = await req.json();

    const clienteExistente = await prisma.clientes.findFirst({ where: { Email: email } });
    if (clienteExistente) {
      return NextResponse.json({ message: "Email já registado" }, { status: 400 });
    }

    const senhaHash = senha ? bcrypt.hashSync(senha, 10) : null;

    const novoCliente = await prisma.clientes.create({
      data: {
        Nome: nome,
        Email: email,
        Telemovel: telemovel,
        Morada: morada,
        DataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        Nif: nif ? Number(nif) : null,
        Senha: senhaHash,
      },
    });

    return NextResponse.json(novoCliente, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return NextResponse.json({ message: "Erro ao criar cliente" }, { status: 500 });
  }
}

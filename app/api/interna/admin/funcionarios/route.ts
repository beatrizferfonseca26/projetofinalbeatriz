// app/api/administrador/funcionarios/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 🔹 Listar todos funcionários
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "administrador") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const funcionarios = await prisma.funcionarios.findMany({
      select: {
        Id_Funcionario: true,
        Nome: true,
        Email: true,
        Administrador: true,
      },
    });
    console.log('Funcionarios>',funcionarios);
    return NextResponse.json(funcionarios, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro ao listar funcionários" }, { status: 500 });
  }
}

// 🔹 Criar novo funcionário
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "administrador") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { nome, email, senha, telefone, administrador } = await req.json();

    const senhaHash = bcrypt.hashSync(senha, 10);

    const novoFuncionario = await prisma.funcionarios.create({
      data: {
        Nome: nome,
        Email: email,
        Senha: senhaHash,
        Administrador: administrador ?? false,
      },
    });

    return NextResponse.json(novoFuncionario, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro ao criar funcionário" }, { status: 500 });
  }
}

// 🔹 Atualizar funcionário existente
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session as any).tipo !== "administrador") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id, nome, email, telefone, senha, administrador } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID do funcionário é obrigatório" }, { status: 400 });
    }

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
      where: { Id_Funcionario: Number(id) },
      data: updateData,
    });

    return NextResponse.json(funcionarioAtualizado, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro ao atualizar funcionário" }, { status: 500 });
  }
}

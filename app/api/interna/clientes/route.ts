import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, senha } = body;

    // Validações simples
    if (!nome || !email || !senha) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    // Verificar se já existe cliente com esse e-mail
    const existingUser = await prisma.clientes.findFirst({
      where: { Email: email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'E-mail já está em uso.' }, { status: 400 });
    }

    // Gerar hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar novo cliente
    const novoCliente = await prisma.clientes.create({
      data: {
        Nome: nome,
        Email: email,
        Senha: hashedPassword,
        // campos opcionais como Telemovel, Nif etc. podem ser definidos aqui se desejado
      },
    });

    return NextResponse.json(
      { message: 'Conta criada com sucesso.', clienteId: novoCliente.Id_Cliente },
      { status: 201 }
    );
  } catch (error) {
    console.error('[ERRO_REGISTER_CLIENTE]', error);
    return NextResponse.json({ message: 'Erro ao criar cliente.' }, { status: 500 });
  }
}

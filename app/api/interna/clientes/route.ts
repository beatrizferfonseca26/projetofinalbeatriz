import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: 'Email é obrigatório' }, { status: 400 });
    }

    // como Email não é único no schema, usamos findFirst
    const cliente = await prisma.clientes.findFirst({
      where: { Email: email },
    });

    if (!cliente) {
      return NextResponse.json({ message: 'Cliente não encontrado' }, { status: 404 });
    }

    // não devolver a senha para o frontend
    const { Senha, ...clienteSemSenha } = cliente;

    return NextResponse.json(clienteSemSenha, { status: 200 });
  } catch (error) {
    console.error('[ERRO_GET_CLIENTE]', error);
    return NextResponse.json({ message: 'Erro ao buscar cliente.' }, { status: 500 });
  }
}


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

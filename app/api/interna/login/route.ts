import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, senha } = await req.json();

  // Verifica cliente
  const cliente = await prisma.clientes.findFirst({ where: { Email: email } });
  if (cliente && cliente.Senha && bcrypt.compareSync(senha, cliente.Senha)) {
    return NextResponse.json({ redirectTo: '/clientes' });
  }

  // Verifica funcionário
  const funcionario = await prisma.funcionarios.findFirst({ where: { Email: email } });
  if (funcionario && funcionario.Senha && bcrypt.compareSync(senha, funcionario.Senha)) {
    const destino = funcionario.Administrador ? '/administrador' : '/funcionarios';
    return NextResponse.json({ redirectTo: destino });
  }

  return NextResponse.json({ message: 'Email ou senha inválidos' }, { status: 401 });
}

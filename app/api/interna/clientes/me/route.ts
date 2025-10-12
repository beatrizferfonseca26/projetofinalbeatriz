import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
// ajuste o import de authOptions conforme o seu projeto:
import { authOptions } from '@/lib/auth'; // <-- ajustar se necessário
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Sessão não encontrada' }, { status: 404 });
    }

    const cliente = await prisma.clientes.findFirst({
      where: { Email: session.user.email },
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

    if (!cliente) return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });

    return NextResponse.json(cliente);
  } catch (err) {
    console.error('GET /api/interna/clientes/me error', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
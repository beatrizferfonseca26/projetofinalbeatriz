import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.Email || !body.Senha) {
      return NextResponse.json({ error: 'Email e Senha são obrigatórios' }, { status: 400 });
    }

    // valida NIF quando preenchido
    if (body.Nif != null) {
      const nifStr = String(body.Nif).replace(/\D/g, '');
      if (nifStr.length !== 9) {
        return NextResponse.json({ error: 'NIF inválido. Deve ter 6 dígitos.' }, { status: 400 });
      }
      body.Nif = Number(nifStr);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(String(body.Senha), salt);

    const created = await prisma.clientes.create({
      data: {
        Nome: body.Nome ?? null,
        Email: body.Email,
        Telemovel: body.Telemovel ?? null,
        Senha: hashed,
        DataNascimento: body.DataNascimento ? new Date(body.DataNascimento) : null,
        Morada: body.Morada ?? null,
        Nif: body.Nif ?? null,
      },
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

    return NextResponse.json({ success: true, cliente: created }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/interna/clientes/register error', err);
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'Email já registado' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro ao criar cliente' }, { status: 500 });
  }
}
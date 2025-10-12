import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) return NextResponse.json({ error: 'Id inválido' }, { status: 400 });

    const body = await request.json();

    // valida NIF quando preenchido
    if (body.Nif != null) {
      const nifStr = String(body.Nif).replace(/\D/g, '');
      if (nifStr.length !== 9) {
        return NextResponse.json({ error: 'NIF inválido. Deve ter 6 dígitos.' }, { status: 400 });
      }
      body.Nif = Number(nifStr);
    }

    const data: any = {};
    if (body.Nome != null) data.Nome = body.Nome;
    if (body.Email != null) data.Email = body.Email;
    if (body.Telemovel != null) data.Telemovel = body.Telemovel;
    if (body.DataNascimento !== undefined) data.DataNascimento = body.DataNascimento ? new Date(body.DataNascimento) : null;
    if (body.Morada != null) data.Morada = body.Morada;
    if (body.Nif !== undefined) data.Nif = body.Nif;

    if (body.Senha) {
      const salt = await bcrypt.genSalt(10);
      data.Senha = await bcrypt.hash(String(body.Senha), salt);
    }

    const updated = await prisma.clientes.update({
      where: { Id_Cliente: id },
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
    console.error('PUT /api/interna/clientes/[id] error', err);
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'Email já em uso' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro ao atualizar cliente' }, { status: 500 });
  }
}
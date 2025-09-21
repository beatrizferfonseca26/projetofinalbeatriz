import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

// GET: lista todos os serviços
export async function GET() {
  try {
    const servicos = await prisma.servicos.findMany({
      include:  {
        produtos: {
          include: {
            imagens: true
          }
        }
      }
    });
        return NextResponse.json(servicos);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return NextResponse.json({ error: "Erro ao buscar serviços" }, { status: 500 });
  }
}

// POST: cria um novo serviço
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { Nome, Titulo, Descricao, Duracao, Valor, Id_Produto } = body;

    const novoServico = await prisma.servicos.create({
      data: {
        Nome,
        Titulo,
        Descricao,
        Duracao,
        Valor,
        Id_Produto,
      },
    });

    return NextResponse.json(novoServico, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    return NextResponse.json({ error: "Erro ao criar serviço" }, { status: 500 });
  }
}

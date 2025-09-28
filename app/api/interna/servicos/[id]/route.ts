import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/interna/servicos/[id]
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const servico = await prisma.servicos.findUnique({
      where: { Id_Servico: Number(id) },
      include: {
        produtos: { include: { imagens: true } },
        disponibilidadeprod: {
          include: {
            produtos: { include: { imagens: true } },
          },
        },
      },
    });

    if (!servico) {
      return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });
    }

    return NextResponse.json(servico);
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    return NextResponse.json({ error: "Erro ao buscar serviço" }, { status: 500 });
  }
}

// PUT /api/interna/servicos/[id]
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { Nome, Titulo, Descricao, Duracao, Valor, Id_Produto } = body;
    const { id } = context.params;

    const servicoAtualizado = await prisma.servicos.update({
      where: { Id_Servico: Number(id) },
      data: { Nome, Titulo, Descricao, Duracao, Valor, Id_Produto },
    });

    return NextResponse.json(servicoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    return NextResponse.json({ error: "Erro ao atualizar serviço" }, { status: 500 });
  }
}

// DELETE /api/interna/servicos/[id]
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    await prisma.servicos.delete({
      where: { Id_Servico: Number(id) },
    });

    return NextResponse.json({ message: "Serviço excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir serviço:", error);
    return NextResponse.json({ error: "Erro ao excluir serviço" }, { status: 500 });
  }
}

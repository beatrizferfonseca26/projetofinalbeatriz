import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

// DELETE - deletar imagem específica
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; imagemId: string } }
) {
  try {
    const produtoId = Number(params.id);
    const imagemId = Number(params.imagemId);

    if (isNaN(produtoId) || isNaN(imagemId)) {
      return NextResponse.json(
        { error: "ID do produto ou imagem inválido." },
        { status: 400 }
      );
    }

    // Buscar a imagem no banco de dados
    const imagem = await prisma.imagens.findUnique({
      where: { Id_Imagem: imagemId },
    });

    if (!imagem) {
      return NextResponse.json(
        { error: "Imagem não encontrada." },
        { status: 404 }
      );
    }

    // Verificar se a imagem pertence ao produto correto
    if (imagem.Id_Produto !== produtoId) {
      return NextResponse.json(
        { error: "Imagem não pertence ao produto especificado." },
        { status: 400 }
      );
    }

    // Deletar arquivo físico do sistema
    if (imagem.CaminhoImagem) {
      try {
        const caminhoCompleto = path.join(process.cwd(), "public", imagem.CaminhoImagem);
        await fs.unlink(caminhoCompleto);
      } catch (fileError) {
        console.warn("Arquivo físico não encontrado ou já deletado:", fileError);
        // Continua mesmo se o arquivo não existir
      }
    }

    // Deletar registro do banco de dados
    await prisma.imagens.delete({
      where: { Id_Imagem: imagemId },
    });

    return NextResponse.json({
      success: true,
      message: "Imagem deletada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar imagem." },
      { status: 500 }
    );
  }
}
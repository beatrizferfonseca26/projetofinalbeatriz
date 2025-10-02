import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Função auxiliar para salvar imagens
async function saveImages(files: File[], produtoId: number) {
  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "produtos",
    String(produtoId)
  );
  await fs.mkdir(uploadDir, { recursive: true });

  const imagensSalvas = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`Formato inválido: ${file.type}`);
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`Arquivo muito grande: ${file.name}`);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    const caminhoImagem = `/uploads/produtos/${produtoId}/${file.name}`;
    imagensSalvas.push({
      CaminhoImagem: caminhoImagem,
      AltText: file.name,
      Id_Produto: produtoId,
    });
  }

  return imagensSalvas;
}

// GET - retorna um produto específico
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const produto = await prisma.produtos.findUnique({
    where: { Id_Produto: id },
    include: { imagens: true },
  });

  if (!produto) {
    return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
  }

  return NextResponse.json(produto);
}

// PUT - editar produto
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { nome, estoque, estoqueCritico } = await req.json();

  if (!nome) {
    return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
  }

  try {
    const produtoAtualizado = await prisma.produtos.update({
      where: { Id_Produto: id },
      data: {
        Nome: nome,
        Estoque: typeof estoque === "number" ? estoque : null,
        EstoqueCritico: typeof estoqueCritico === "number" ? estoqueCritico : null,
      },
    });

    return NextResponse.json(produtoAtualizado);
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    return NextResponse.json({ error: "Erro ao atualizar produto." }, { status: 500 });
  }
}

// DELETE - remover produto
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    // Deleta imagens do banco
    await prisma.imagens.deleteMany({ where: { Id_Produto: id } });

    // Deleta produto
    await prisma.produtos.delete({ where: { Id_Produto: id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    return NextResponse.json({ error: "Erro ao deletar produto." }, { status: 500 });
  }
}

// POST - upload de imagens
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    const formData = await req.formData();
    const files = formData.getAll("imagens") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    const imagensSalvas = await saveImages(files, id);

    const imagensCriadas = await prisma.imagens.createMany({
      data: imagensSalvas,
    });

    return NextResponse.json({
      message: "Imagens enviadas com sucesso.",
      count: imagensCriadas.count,
    });
  } catch (err: any) {
    console.error("Erro no upload de imagens:", err);
    return NextResponse.json({ error: err.message || "Erro no upload." }, { status: 500 });
  }
}

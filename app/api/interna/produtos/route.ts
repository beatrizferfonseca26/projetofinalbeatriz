import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { promises as fs } from "fs";
import path from "path";

// Função auxiliar para salvar imagens no disco (ajuste conforme seu storage)
async function saveImages(files: File[], produtoId: number) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "produtos", String(produtoId));
  await fs.mkdir(uploadDir, { recursive: true });

  const imagensSalvas = [];
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    const caminhoImagem = `/uploads/produtos/${produtoId}/${file.name}`;
    imagensSalvas.push({
      CaminhoImagem: caminhoImagem,
      AltText: file.name,
    });
  }
  return imagensSalvas;
}

// GET: Lista todos os produtos com imagens
export async function GET() {
  const produtos = await prisma.produtos.findMany({
    include: { imagens: true },
    orderBy: { Id_Produto: "asc" },
  });
  return NextResponse.json(produtos);
}

// POST: Cria novo produto (com imagens)
export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  if (contentType.startsWith("multipart/form-data")) {
    // Para upload de imagens via multipart (não implementado aqui)
    return NextResponse.json({ error: "Use JSON para criar produto e endpoint /produtos/[id]/imagens para imagens." }, { status: 400 });
  }

  // Recebe dados do produto
  const { nome, estoque, estoqueCritico, descricao, valor } = await req.json();

  if (!nome) {
    return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
  }

  const novoProduto = await prisma.produtos.create({
    data: {
      Nome: nome,
      Estoque: typeof estoque === "number" ? estoque : null,
      EstoqueCritico: typeof estoqueCritico === "number" ? estoqueCritico : null,
      // Adicione outros campos se necessário
    },
  });

  return NextResponse.json(novoProduto);
}

// PUT: Edita produto existente
export async function PUT(req: NextRequest) {
  const { id, nome, estoque, estoqueCritico, descricao, valor } = await req.json();

  if (!id || !nome) {
    return NextResponse.json({ error: "ID e nome são obrigatórios." }, { status: 400 });
  }

  const produtoAtualizado = await prisma.produtos.update({
    where: { Id_Produto: Number(id) },
    data: {
      Nome: nome,
      Estoque: typeof estoque === "number" ? estoque : null,
      EstoqueCritico: typeof estoqueCritico === "number" ? estoqueCritico : null,
      // Adicione outros campos se necessário
    },
  });

  return NextResponse.json(produtoAtualizado);
}
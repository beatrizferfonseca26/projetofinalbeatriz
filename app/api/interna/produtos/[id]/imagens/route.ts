import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

// Configurações de validação
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("imagens") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Nenhuma imagem enviada." }, { status: 400 });
    }

    const produtoId = Number(params.id);
    if (isNaN(produtoId)) {
      return NextResponse.json({ error: "ID do produto inválido." }, { status: 400 });
    }

    // Valida cada arquivo
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: `Formato não permitido: ${file.type}` }, { status: 400 });
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `Arquivo muito grande (${file.size} bytes). Máx: 2MB.` }, { status: 400 });
      }
    }

    // Criar diretório do produto
    const uploadDir = path.join(process.cwd(), "public", "uploads", "produtos", String(produtoId));
    await fs.mkdir(uploadDir, { recursive: true });

    const imagensSalvas = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filePath = path.join(uploadDir, file.name);

      // Salvar no disco
      await fs.writeFile(filePath, buffer);

      const caminhoImagem = `/uploads/produtos/${produtoId}/${file.name}`;

      // Salvar no banco
      const imagemCriada = await prisma.imagens.create({
        data: {
          CaminhoImagem: caminhoImagem,
          AltText: file.name,
          Id_Produto: produtoId,
        },
      });

      imagensSalvas.push(imagemCriada);
    }

    return NextResponse.json({ success: true, imagens: imagensSalvas });
  } catch (err) {
    console.error("Erro no upload:", err);
    return NextResponse.json({ error: "Erro ao salvar imagens." }, { status: 500 });
  }
}

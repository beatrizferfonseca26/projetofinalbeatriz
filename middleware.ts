// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Bloqueia acesso se não autenticado e tenta acessar áreas privadas
  if (!token && (
    pathname.startsWith("/administrador") ||
    pathname.startsWith("/funcionarios") ||
    pathname.startsWith("/clientes")
  )) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("login", "true"); // opcional: abre modal de login
    return NextResponse.redirect(loginUrl);
  }

  // Se autenticado → verifica tipo
  if (token) {
    const tipo = token.tipo;

    if (pathname.startsWith("/administrador") && tipo !== "administrador") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/funcionarios") && tipo !== "funcionario") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/clientes") && tipo !== "cliente") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/administrador/:path*", "/funcionarios/:path*", "/clientes/:path*"],
};

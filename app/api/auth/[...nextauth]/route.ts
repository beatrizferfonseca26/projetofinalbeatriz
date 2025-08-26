import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) return null;

        // 🔹 Buscar Cliente
        const cliente = await prisma.clientes.findFirst({
          where: { Email: credentials.email },
        });

        if (cliente && cliente.Senha && bcrypt.compareSync(credentials.senha, cliente.Senha)) {
          return {
            id: cliente.Id_Cliente.toString(),
            email: cliente.Email ?? "",
            name: cliente.Nome ?? "",
            tipo: "cliente",
          };
        }

        // 🔹 Buscar Funcionário
        const funcionario = await prisma.funcionarios.findFirst({
          where: { Email: credentials.email },
        });

        if (funcionario && funcionario.Senha && bcrypt.compareSync(credentials.senha, funcionario.Senha)) {
          return {
            id: funcionario.Id_Funcionario.toString(),
            email: funcionario.Email ?? "",
            name: funcionario.Nome ?? "",
            tipo: funcionario.Administrador ? "administrador" : "funcionario",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/", // sua página de login
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tipo = (user as any).tipo;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.tipo) {
        (session as any).tipo = token.tipo;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Handler para rotas de API
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

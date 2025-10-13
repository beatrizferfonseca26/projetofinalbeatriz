// lib/auth.ts
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        console.log('authorize called for', credentials?.email);
        if (!credentials?.email || !credentials?.senha) {
          console.log('authorize: missing credentials');
          return null;
        }
        const email = credentials.email;
        const senha = credentials.senha;

        // 🔹 1️⃣ Verifica se é cliente
        const cliente = await prisma.clientes.findFirst({
          where: { Email: email },
        });
        if (cliente && cliente.Senha && bcrypt.compareSync(senha, cliente.Senha)) {
          console.log('authorize: cliente authenticated', cliente.Id_Cliente);
          return { id: cliente.Id_Cliente.toString(), email: cliente.Email, tipo: 'cliente', isAdmin: false } as User;
        }

        // 🔹 2️⃣ Verifica se é funcionário
        const funcionario = await prisma.funcionarios.findFirst({
          where: { Email: email },
        });
        if (
          funcionario &&
          funcionario.Senha &&
          bcrypt.compareSync(senha, funcionario.Senha)
        ) {
          console.log('authorize: funcionario authenticated', funcionario.Id_Funcionario, 'admin:', funcionario.Administrador);
          return { id: funcionario.Id_Funcionario.toString(), email: funcionario.Email, tipo: funcionario.Administrador ? 'administrador' : 'funcionario', isAdmin: !!funcionario.Administrador } as User;
        }

        // ❌ Se não encontrou utilizador válido
        console.log('authorize: authentication failed for', email);
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt callback -> user:', user, 'token before:', token);
      if (user) {
        token.id = user.id;
        token.tipo = (user as any).tipo;
        token.isAdmin = (user as any).isAdmin;
      }
      console.log('jwt callback -> token after:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('session callback -> token:', token, 'session before:', session);
      session.user.id = token.id;
      session.user.tipo = token.tipo as any;
      session.user.isAdmin = token.isAdmin as any;
      session.tipo = token.tipo as any;
      console.log('session callback -> session after:', session);
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/", // onde o login modal está
  },
};

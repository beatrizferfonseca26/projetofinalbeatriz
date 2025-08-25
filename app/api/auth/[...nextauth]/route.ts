
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import type { User } from 'next-auth';

interface MyUser extends User {
  id: string;
  nome: string | null;
  tipo: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        senha: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, senha } = credentials;

        const cliente = await prisma.clientes.findFirst({
          where: { Email: email || '' },
        });

        if (cliente && cliente.Senha && bcrypt.compareSync(senha, cliente.Senha)) {
          return {
            id: cliente.Id_Cliente.toString(),
            email: cliente.Email ?? '',
            nome: cliente.Nome,
            tipo: 'cliente',
          };
        }

        const funcionario = await prisma.funcionarios.findFirst({
          where: { Email: email || '' },
        });

        if (funcionario && funcionario.Senha && bcrypt.compareSync(senha, funcionario.Senha)) {
          return {
            id: funcionario.Id_Funcionario.toString(),
            email: funcionario.Email ?? '',
            nome: funcionario.Nome,
            tipo: funcionario.Administrador ? 'administrador' : 'funcionario',
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tipo = (user as { tipo: string }).tipo;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import type { User } from 'next-auth';

interface MyUser extends User {
  id: string;
  nome: string | null;
  tipo: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        senha: { label: 'Senha', type: 'password' },
      },
      // authorize aceita 2 parâmetros: credentials e req (request)
      async authorize(
        credentials: Record<'email' | 'senha', string> | undefined,
        req?: any
      ): Promise<MyUser | null> {
        if (!credentials) return null;

        const { email, senha } = credentials;

        // Busca cliente
        const cliente = await prisma.clientes.findFirst({
          where: { Email: email || '' },
        });
        
        console.log('Senha enviada:', senha);
        console.log('Senha hash no banco:', cliente?.Senha);

        if (cliente && cliente.Senha && bcrypt.compareSync(senha, cliente.Senha)) {
          return {
            id: cliente.Id_Cliente.toString(),
            email: cliente.Email ?? '', 
            nome: cliente.Nome,
            tipo: 'cliente',
          };
        }

        // Busca funcionário
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
    maxAge: 30 * 24 * 60 * 60, // 30 dias
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
});

export { handler as GET, handler as POST };

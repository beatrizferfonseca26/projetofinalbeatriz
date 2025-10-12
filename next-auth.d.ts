import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    tipo?: "cliente" | "funcionario" | "administrador";
    user: {
      id?: string;
      tipo?: "cliente" | "funcionario" | "administrador";
      isAdmin?: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    tipo?: "cliente" | "funcionario" | "administrador";
    isAdmin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    tipo?: "cliente" | "funcionario" | "administrador";
    isAdmin?: boolean;
  }
}

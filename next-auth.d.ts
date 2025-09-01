import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    tipo?: "cliente" | "funcionario" | "admin";
    user: {
      name?: string | null;
      email?: string | null;
    };
  }
}

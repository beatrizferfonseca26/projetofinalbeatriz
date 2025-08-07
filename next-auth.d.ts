import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    tipo?: string;
  }

  interface Session {
    tipo?: string;
  }
}

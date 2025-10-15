// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

type SidebarItem = { label: string; href?: string; action?: () => void };

const sidebarOptions: Record<"cliente"|"funcionario"|"administrador", SidebarItem[]> = {
  cliente: [
    { label: "Início", href: "/clientes" },
    { label: "Agendamentos", href: "/clientes/agendamentos" },
    { label: "Terminar Sessão", action: () => signOut({ callbackUrl: "/" }) },
  ],
  funcionario: [
    { label: "Início", href: "/funcionarios" },
    { label: "Agenda", href: "/funcionarios/agendamentos" },
    { label: "Gerir Clientes", href: "/funcionarios/clientes" },
    { label: "Terminar Sessão", action: () => signOut({ callbackUrl: "/" }) },
  ],
  administrador: [
    { label: "Painel de Controle", href: "/administrador" },
    { label: "Gerir Funcionários", href: "/administrador/funcionarios" },
    { label: "Gerir Serviços", href: "/administrador/servicos" },
    { label: "Gerir Agendamentos", href: "/administrador/agendamentos" },
    { label: "Gerir Clientes", href: "/administrador/clientes" },
    { label: "Gerir Disponibilidade", href: "/administrador/disponibilidade" },
    { label: "Gerir Produtos", href: "/administrador/produtos" },
    { label: "Terminar Sessão", action: () => signOut({ callbackUrl: "/" }) },
  ],
};

export default function Sidebar() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.tipo as keyof typeof sidebarOptions | undefined;

  if (!role) return null;

  const links = sidebarOptions[role];
  return (
    <aside className="w-64 min-h-full bg-black text-white p-4 space-y-4 flex flex-col">
      <h2 className="text-xl font-bold border-b border-gray-600 pb-2 mb-4">
        Bem-vindo, {session?.user?.name ?? role}
      </h2>
      <nav className="space-y-2 flex-1">
        {links.map((item) =>
          item.href ? (
            <Link key={item.label} href={item.href} className="block hover:text-gray-300">
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={item.action}
              className="block text-left w-full hover:text-gray-300"
            >
              {item.label}
            </button>
          )
        )}
      </nav>
    </aside>
  );
}

'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

type SidebarItem = {
  label: string;
  href?: string;
  action?: () => void;
};

const sidebarOptions: Record<string, SidebarItem[]> = {
  cliente: [
    { label: 'Início', href: '/clientes' },
    { label: 'Agendamentos', href: '/clientes/agendamentos' },
    { label: 'Perfil', href: '/clientes/editar' },
    { label: 'Terminar Sessão', action: () => signOut({ callbackUrl: '/' }) },
  ],
  funcionario: [
    { label: 'Início', href: '/funcionarios' },
    { label: 'Agenda', href: '/funcionarios/agendamentos' },
    { label: 'Terminar Sessão', action: () => signOut({ callbackUrl: '/' }) },
  ],
  admin: [
    { label: 'Painel de Controle', href: '/administrador' },
    { label: 'Gerir Funcionários', href: '/administrador/funcionarios' },
    { label: 'Gerir Serviços', href: '/administrador/servicos' },
    { label: 'Gerir Produtos', href: '/administrador/produtos' },
    { label: 'Terminar Sessão', action: () => signOut({ callbackUrl: '/' }) },
  ],
};

export default function Sidebar() {
  const { data: session } = useSession();

  if (!session || !session.tipo) return null;

  const links =
    session?.tipo && sidebarOptions[session.tipo as keyof typeof sidebarOptions];

  if (!links) return null;

  return (
    <aside className="w-64 h-screen bg-black text-white p-4 space-y-4">
      <h2 className="text-xl font-bold border-b border-gray-600 pb-2 mb-4">
        Bem-vindo, {session?.user?.name ?? session.tipo}
      </h2>
      <nav className="space-y-2">
        {links.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className="block hover:text-gray-300"
            >
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

'use client';

import Link from "next/link";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SideBar from '@/components/sideBar';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protege a página — redireciona se não for admin
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/"); // não autenticado
    } else if (session.user?.tipo !== "administrador") {
      router.push("/"); // autenticado mas não é admin
    }
    console.log('Admin page session status:', status, session);
  }, [status, session, router]);

  if (status === "loading" || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 border-r hidden md:block">
        <SideBar />
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Painel do Administrador</h1>
            <p className="text-center text-gray-600 mb-10">
              Acesse as funcionalidades administrativas do sistema.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Funcionários */}
              <Link href="/administrador/funcionarios">
                <div className="p-6 bg-gray-50 hover:bg-gray-200 transition rounded-xl shadow cursor-pointer">
                  <h2 className="text-lg font-semibold">Funcionários</h2>
                  <p className="text-sm text-gray-600 mt-2">Gerencie dados de funcionários.</p>
                </div>
              </Link>

              {/* Clientes */}
              <Link href="/administrador/clientes">
                <div className="p-6 bg-gray-50 hover:bg-gray-200 transition rounded-xl shadow cursor-pointer">
                  <h2 className="text-lg font-semibold">Clientes</h2>
                  <p className="text-sm text-gray-600 mt-2">Gerencie dados de clientes.</p>
                </div>
              </Link>

              {/* Serviços */}
              <Link href="/administrador/servicos">
                <div className="p-6 bg-gray-50 hover:bg-gray-200 transition rounded-xl shadow cursor-pointer">
                  <h2 className="text-lg font-semibold">Serviços</h2>
                  <p className="text-sm text-gray-600 mt-2">Adicione, edite ou remova serviços.</p>
                </div>
              </Link>

              {/* Produtos */}
              <Link href="/administrador/produtos">
                <div className="p-6 bg-gray-50 hover:bg-gray-200 transition rounded-xl shadow cursor-pointer">
                  <h2 className="text-lg font-semibold">Produtos</h2>
                  <p className="text-sm text-gray-600 mt-2">Gerencie produtos disponíveis.</p>
                </div>
              </Link>

              {/* Agendamentos */}
              <Link href="/administrador/agendamentos">
                <div className="p-6 bg-gray-50 hover:bg-gray-200 transition rounded-xl shadow cursor-pointer">
                  <h2 className="text-lg font-semibold">Agendamentos</h2>
                  <p className="text-sm text-gray-600 mt-2">Visualize e cancele agendamentos.</p>
                </div>
              </Link>

              {/* Disponibilidade */}
              <Link href="/administrador/disponibilidade">
                <div className="p-6 bg-gray-50 hover:bg-gray-200 transition rounded-xl shadow cursor-pointer">
                  <h2 className="text-lg font-semibold">Disponibilidade</h2>
                  <p className="text-sm text-gray-600 mt-2">Defina horários disponíveis.</p>
                </div>
              </Link>

              {/* Pagamentos */}
              <Link href="/administrador/pagamentos">
                <div className="p-6 bg-gray-50 hover:bg-gray-200 transition rounded-xl shadow cursor-pointer">
                  <h2 className="text-lg font-semibold">Pagamentos</h2>
                  <p className="text-sm text-gray-600 mt-2">Gerencie pagamentos realizados.</p>
                </div>
              </Link>
            </div>
          </div>
        </main>

        {/* Rodapé fixo */}
        <footer className="bg-gray-900 text-white text-center py-4">
          <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

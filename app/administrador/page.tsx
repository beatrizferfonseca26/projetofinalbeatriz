'use client';

import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Conteúdo principal */}
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
          </div>
        </div>
      </main>

      {/* Rodapé fixo */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
       <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

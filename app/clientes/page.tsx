'use client';

import Sidebar from '@/components/sideBar';
import { useRouter } from 'next/navigation';

export default function ClientesPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar lateral */}
        <Sidebar />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 md:p-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-800">Área do Cliente</h1>

            <section className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Bem-vindo à sua conta!
              </h2>
              <p className="text-gray-600">
                Aqui você pode gerenciar seus agendamentos, visualizar seus serviços,
                atualizar seu perfil e muito mais.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => router.push('/clientes/agendamentos')}
                className="cursor-pointer bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-medium text-gray-700 mb-2">Meus Agendamentos</h3>
                <p className="text-sm text-gray-600">
                  Visualize ou edite os agendamentos futuros e passados.
                </p>
              </div>

              <div
                onClick={() => router.push('/clientes/editar')}
                className="cursor-pointer bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-medium text-gray-700 mb-2">Editar Perfil</h3>
                <p className="text-sm text-gray-600">
                  Atualize seus dados pessoais, como nome, e-mail e senha.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Rodapé fixo */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

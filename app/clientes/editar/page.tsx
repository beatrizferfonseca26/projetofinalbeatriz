'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Sidebar from "@/components/sideBar";

export default function EditarContaPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [morada, setMorada] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  // 🔹 Buscar dados atuais do cliente
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const res = await fetch("/api/interna/clientes/me");
        if (!res.ok) return;
        const data = await res.json();
        setNome(data.Nome || "");
        setEmail(data.Email || "");
        setMorada(data.Morada || "");
        setTelefone(data.Telefone || "");
      } catch {
        setError("Erro ao carregar dados do cliente.");
      }
    };
    fetchCliente();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/interna/clientes/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, morada, telefone, senha }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("Conta atualizada com sucesso!");
        setSenha("");
        setIsModalOpen(false);
      } else {
        setError(data.error || "Erro ao atualizar conta.");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Minha Conta</h1>

          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Editar Informações
          </Button>

          {message && <p className="mt-4 text-green-600">{message}</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </main>

        {/* Rodapé */}
          <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
      </footer>
      </div>

      {/* Modal de edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <h2 className="text-xl font-bold mb-4">Editar Conta</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                disabled
                className="border p-2 rounded bg-gray-100 cursor-not-allowed"
              />

              <input
                type="text"
                placeholder="Morada"
                value={morada}
                onChange={(e) => setMorada(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="border p-2 rounded"
              />

              <input
                type="password"
                placeholder="Nova Senha (opcional)"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="border p-2 rounded"
              />

              <div className="flex gap-4 mt-4">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Aguardar..." : "Guardar Alterações"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

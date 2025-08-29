'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button  from "@/components/ui/button";
export default function EditarContaPage() {
  const [nome, setNome] = useState("");
  const [morada, setMorada] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/interna/clientes/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, morada, telefone, senha }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("Conta atualizada com sucesso!");
        setSenha(""); 
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
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
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

        <div className="flex gap-4">
          {/* Botão salvar alterações */}
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>

          {/* Botão voltar */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/clientes")}
          >
            Voltar
          </Button>
        </div>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}
    </div>
  );
}

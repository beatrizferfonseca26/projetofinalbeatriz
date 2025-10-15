"use client";

import { useEffect, useState } from "react";
import { Input } from "@heroui/react";
import Button from "@/components/ui/button";
import Sidebar from "@/components/sideBar";
import { toast } from "react-toastify";

interface Servico {
  Id_Servico: number;
  Nome: string | null;
  Titulo: string | null;
  Descricao: string | null;
  Valor: number | null;
  Duracao: number | null;
  Id_Produto: number | null;
}
interface Produto {
  Id_Produto: number;
  Nome: string | null;
}

export default function ServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);

  // produtos e selecção no form
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProdutoId, setSelectedProdutoId] = useState<number | null>(null);

  // estados do formulário
  const [nome, setNome] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [duracao, setDuracao] = useState("");

  // edição
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchServicos();
    fetchProdutos();
  }, []);

  const fetchServicos = async () => {
    try {
      const res = await fetch("/api/interna/servicos", { credentials: "include" });
      console.log("GET /api/interna/servicos ->", res.status);
      const data = await res.json().catch(() => null);
      const list = Array.isArray(data) ? data : Array.isArray(data?.servicos) ? data.servicos : [];
      setServicos(list);
    } catch (err) {
      console.error("Erro ao carregar serviços:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProdutos = async () => {
    try {
      const res = await fetch("/api/interna/produtos", { credentials: "include" });
      const data = await res.json().catch(() => null);
      const list = Array.isArray(data) ? data : Array.isArray(data?.produtos) ? data.produtos : [];
      setProdutos(list);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  };

  const resetForm = () => {
    setNome("");
    setTitulo("");
    setDescricao("");
    setValor("");
    setDuracao("");
    setEditingId(null);
    setSelectedProdutoId(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      // Se estiver editando, garante PUT para /api/interna/servicos/[id]
      if (editingId) {
        const url = `/api/interna/servicos/${editingId}`;
        const payload = {
          Nome: nome,
          Titulo: titulo,
          Descricao: descricao,
          Valor: valor ? Number(valor) : null,
          Duracao: duracao ? Number(duracao) : null,
          ...(selectedProdutoId ? { Id_Produto: selectedProdutoId } : {}),
        };
        console.log("PUT", url, "payload:", payload);
        const res = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        console.log("PUT response status:", res.status);
        if (res.status === 401) {
          toast.error("Não autorizado. Faça login novamente.");
        } else if (res.status === 404) {
          toast.error("Rota de atualização não encontrada (404). Verifique o servidor.");
        } else if (res.status === 405) {
          toast.error("Método não permitido (PUT) nesta rota.");
        } else if (res.ok) {
          const updated = await res.json().catch(() => null);
          // atualizar localmente sem refetch completo
          setServicos((prev) => prev.map((s) => (s.Id_Servico === editingId ? { ...(s as any), ...(updated || payload) } : s)));
          setOpenForm(false);
          resetForm();
          toast.success("Serviço atualizado com sucesso!");
        } else {
          const txt = await res.text().catch(() => null);
          console.error("Erro ao atualizar serviço:", res.status, txt);
          toast.error(`Erro ao atualizar serviço: ${txt || res.status}`);
        }
      } else {
        // criar novo serviço (POST)
        const res = await fetch("/api/interna/servicos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            Nome: nome,
            Titulo: titulo,
            Descricao: descricao,
            Valor: valor ? Number(valor) : null,
            Duracao: duracao ? Number(duracao) : null,
            ...(selectedProdutoId ? { Id_Produto: selectedProdutoId } : {}),
          }),
        });

        console.log("POST /api/interna/servicos ->", res.status);
        if (res.ok) {
          await fetchServicos();
          setOpenForm(false);
          resetForm();
          toast.success("Serviço criado com sucesso!");
        } else {
          const txt = await res.text().catch(() => null);
          console.error("Erro ao salvar serviço:", res.status, txt);
          toast.error(`Erro ao salvar serviço: ${txt || res.status}`);
        }
      }
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
      toast.error("Erro ao salvar serviço. Ver console do servidor para detalhes.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return;
    try {
      const res = await fetch(`/api/interna/servicos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServicos((prev) => prev.filter((s) => s.Id_Servico !== id));
      }
    } catch (err) {
      console.error("Erro ao excluir serviço:", err);
    }
  };

  const handleEdit = (s: Servico) => {
    setEditingId(s.Id_Servico);
    setNome(s.Nome ?? "");
    setTitulo(s.Titulo ?? "");
    setDescricao(s.Descricao ?? "");
    setValor(s.Valor != null ? String(s.Valor) : "");
    setDuracao(s.Duracao != null ? String(s.Duracao) : "");
    setSelectedProdutoId(s.Id_Produto ?? null);
    setOpenForm(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Serviços</h1>
            <Button variant="primary" onClick={() => setOpenForm(true)}>
              Novo Serviço
            </Button>
          </div>

          {/* Tabela */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {loading ? (
              <p className="p-4 text-gray-600">Carregando...</p>
            ) : servicos.length === 0 ? (
              <p className="p-4 text-gray-600">Nenhum serviço cadastrado.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-3">Nome</th>
                    <th className="p-3">Título</th>
                    <th className="p-3">Descrição</th>
                    <th className="p-3">Duração (min)</th>
                    <th className="p-3">Valor (€)</th>
                    <th className="p-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {servicos.map((s) => (
                    <tr key={s.Id_Servico} className="border-t hover:bg-gray-50">
                      <td className="p-3">{s.Nome}</td>
                      <td className="p-3">{s.Titulo}</td>
                      <td className="p-3">{s.Descricao}</td>
                      <td className="p-3">{s.Duracao || "—"}</td>
                      <td className="p-3">{s.Valor ? `€ ${s.Valor}` : "—"}</td>
                      <td className="p-3 flex gap-3 justify-center">
                        <button
                          onClick={() => handleEdit(s)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(s.Id_Servico)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {/* Modal do formulário  */}
        {openForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                onClick={() => {
                  setOpenForm(false);
                  resetForm();
                }}
                aria-label="Fechar"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">{editingId ? "Editar Serviço" : "Novo Serviço"}</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Produto (opcional)</label>
                  <select
                    value={selectedProdutoId ?? ""}
                    onChange={(e) => setSelectedProdutoId(e.target.value ? Number(e.target.value) : null)}
                    className="w-full border rounded p-2"
                  >
                    <option value="">-- Sem produto --</option>
                    {produtos.map((p) => (
                      <option key={p.Id_Produto} value={p.Id_Produto}>
                        {p.Nome ?? `#${p.Id_Produto}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duração (min)</label>
                  <input
                    type="number"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Valor (€)</label>
                  <input
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenForm(false);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {editingId ? "Atualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
          <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

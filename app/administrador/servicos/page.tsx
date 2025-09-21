"use client";

import { useEffect, useState } from "react";
import { Input, Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import Button from "@/components/ui/button";

interface Servico {
  Id_Servico: number;
  Nome: string | null;
  Titulo: string | null;
  Descricao: string | null;
  Valor: number | null;
  Duracao: number | null;
}

export default function ServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // estados do formulário
  const [nome, setNome] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [duracao, setDuracao] = useState("");

  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const res = await fetch("/api/servicos");
      const data = await res.json();
      setServicos(data);
    } catch (err) {
      console.error("Erro ao carregar serviços:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/interna/servicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nome: nome,
          Titulo: titulo,
          Descricao: descricao,
          Valor: valor ? Number(valor) : null,
          Duracao: duracao ? Number(duracao) : null,
        }),
      });

      if (res.ok) {
        await fetchServicos();
        setOpen(false);
        setNome("");
        setTitulo("");
        setDescricao("");
        setValor("");
        setDuracao("");
      }
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
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

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Serviços</h1>
        <Button variant="primary" onClick={() => setOpen(true)}>
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
                      onClick={() => alert("Fazer tela de edição")}
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

      {/* Modal de cadastro */}
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-bold">Novo Serviço</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                  <Input label="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                  <Input
                    label="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                  <Input
                    label="Duração (min)"
                    type="number"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                  />
                  <Input
                    label="Valor (€)"
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="secondary" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Salvar
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

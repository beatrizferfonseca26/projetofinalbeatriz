'use client';

import { useEffect, useState } from "react";
import Sidebar from "@/components/sideBar";
import Button from "@/components/ui/button";
import { toast } from "react-toastify";
import AgendamentoModal from "@/components/agendamentoModal";

interface Agendamento {
  Id_Agendamento: number;
  Data: string;
  HoraInicio: string;
  HoraFinal: string;
  Status: "Realizado" | "Confirmado" | "Cancelado" | "Marcado";
  Observacoes?: string | null;
  Servico: string;
  Valor: number;
  Funcionario: string | null;
}

const statusOptions: ("Marcado" | "Confirmado" | "Realizado" | "Cancelado")[] = ["Marcado", "Confirmado", "Realizado", "Cancelado"];

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStatusId, setEditStatusId] = useState<number | null>(null);
  const [statusEdit, setStatusEdit] = useState<"Realizado" | "Confirmado" | "Cancelado" | "Marcado" | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para clientes
  const [clientes, setClientes] = useState<Array<{ Id_Cliente: number; Nome?: string; Email?: string }>>([]);
  const [loadingClientes, setLoadingClientes] = useState(false);

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/interna/agendamentos");
      const data = await res.json();
      setAgendamentos(Array.isArray(data) ? data : (data?.agendamentos ?? []));
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
      setAgendamentos([]);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar clientes para o modal
  const fetchClientes = async () => {
    setLoadingClientes(true);
    try {
      const res = await fetch('/api/interna/admin/clientes');
      if (!res.ok) {
        console.error('Erro ao carregar clientes (status != 200):', res.status);
        setClientes([]);
        return;
      }
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setClientes(list);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setClientes([]);
    } finally {
      setLoadingClientes(false);
    }
  };

  // Abrir modal e carregar clientes
  const openModal = async () => {
    await fetchClientes();
    setIsModalOpen(true);
  };

  // Reenviar confirmação
  const handleReenviarConfirmacao = async (Id_Agendamento: number) => {
    try {
      const res = await fetch('/api/interna/agendamentos/confirmacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Id_Agendamento }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.method === 'email') {
          toast.success('Confirmação reenviada via email (WhatsApp indisponível)');
        } else {
          toast.success('Confirmação reenviada via WhatsApp com sucesso!');
        }
      } else {
        toast.error(data.error || 'Erro ao reenviar confirmação');
      }
    } catch (err) {
      console.error('Erro ao reenviar confirmação:', err);
      toast.error('Erro ao reenviar confirmação');
    }
  };

  // quando o modal criar um agendamento (modo funcionário), acrescenta à lista local
  const handleAgendamentoCriado = (novo: any) => {
    // normalizar se necessário (assume estrutura compatível)
    setAgendamentos((prev) => [novo as Agendamento, ...prev]);
    toast.success("Agendamento criado com sucesso!");
    setIsModalOpen(false);
  };
 
  const handleStatusUpdate = async (id: number, status: "Realizado" | "Confirmado" | "Cancelado" | "Marcado") => {
    try {
      const res = await fetch(`/api/interna/agendamentos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Id_Agendamento: id, Status: status }),
      });


      if (res.ok) {
        setAgendamentos((prev) =>
          prev.map((a) =>
            a.Id_Agendamento === id ? { ...a, Status: status } : a
          )
        );
        toast.success("Status atualizado!");
      } else {
        toast.error("Erro ao atualizar status.");
      }
    } catch (err) {
      toast.error("Erro ao atualizar status.");
    } finally {
      setEditStatusId(null);
      setStatusEdit("");
    }


  };

  const handleCancelar = async (id: number) => {
    if (!confirm("Tem certeza que deseja cancelar este agendamento?")) return;
    try {
      const res = await fetch(`/api/interna/agendamentos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Id_Agendamento: id, Status: "Cancelado" }),
      });

      if (res.ok) {
        setAgendamentos((prev) =>
          prev.map((a) =>
            a.Id_Agendamento === id ? { ...a, Status: "Cancelado" } : a
          )
        );
        toast.success("Agendamento cancelado!");
      } else {
        toast.error("Erro ao cancelar agendamento.");
      }
    } catch (err) {
      toast.error("Erro ao cancelar agendamento.");
    }
  };

  return (<div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    <main className="flex-1 p-6 md:p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Agendamentos</h1>
        <Button variant="primary" onClick={openModal}>
          Novo Agendamento
        </Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (<p className="p-4 text-gray-600">Carregando...</p>
        ) : agendamentos.length === 0 ? (<p className="p-4 text-gray-600">Nenhum agendamento encontrado.</p>
        ) : (<table className="w-full border-collapse">
          <thead> <tr className="bg-gray-200 text-left">
            <th className="p-3">Serviço</th>
            <th className="p-3">Funcionário</th>
            <th className="p-3">Valor</th>
            <th className="p-3">Data</th>
            <th className="p-3">Hora Início</th>
            <th className="p-3">Hora Final</th>
            <th className="p-3">Status</th>
            <th className="p-3">Observações</th>
            <th className="p-3 text-center">Ações</th>
          </tr> </thead> <tbody>
            {agendamentos.map((a) => (<tr
              key={a.Id_Agendamento}
              className="border-t hover:bg-gray-50"
            > <td className="p-3">{a.Servico || "-"}</td> <td className="p-3">{a.Funcionario || "-"}</td> <td className="p-3">
                {a.Valor ? `€${a.Valor.toFixed(2)}` : "-"} </td> <td className="p-3">
                {a.Data ? new Date(a.Data).toLocaleDateString() : "-"} </td> <td className="p-3">
                {a.HoraInicio ? a.HoraInicio : "-"} </td> <td className="p-3">
                {a.HoraFinal ? a.HoraFinal : "-"} </td> <td className="p-3">
                {editStatusId === a.Id_Agendamento ? (
                  <select
                    value={statusEdit}
                    onChange={(e) => {
                      const value = e.target.value as "Realizado" | "Confirmado" | "Cancelado" | "Marcado" | "";
                      setStatusEdit(value);
                    }}
                    className="border rounded px-2 py-1"
                  > <option value="">Selecione</option>
                    {statusOptions.map((status) => (<option key={status} value={status}>
                      {status} </option>
                    ))} </select>
                ) : (
                  a.Status || "-"
                )} </td> <td className="p-3">{a.Observacoes || "-"}</td> <td className="p-3 flex gap-2 justify-center">
                {editStatusId === a.Id_Agendamento ? (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (statusEdit !== "") {
                          handleStatusUpdate(a.Id_Agendamento, statusEdit);
                        }
                      }}
                      disabled={statusEdit === ""}
                    >
                      Guardar </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditStatusId(null)}
                    >
                      Cancelar </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setEditStatusId(a.Id_Agendamento);
                        setStatusEdit(a.Status || "");
                      }}
                    >
                      Editar Status </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleCancelar(a.Id_Agendamento)}
                      disabled={a.Status === "Cancelado"}
                    >
                      Cancelar Agendamento </Button>
                    {/* {a.Status === "Marcado" && (
                      <Button
                        variant="primary"
                        onClick={() => handleReenviarConfirmacao(a.Id_Agendamento)}
                      >
                        📱 Confirmar
                      </Button>
                    )} */}
                  </>
                )} </td> </tr>
            ))} </tbody> </table>
        )} </div>

      {/* Agendamento modal em modo funcionário */}
      <AgendamentoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAgendamentoCriado={handleAgendamentoCriado}
        isEditing={false}
        initialData={null}
        madeByFuncionario={true}
        clientes={clientes} 
        loadingClientes={loadingClientes}
   />
    </main>
  </div>
  );
}

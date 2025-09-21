"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sideBar";


interface Servico {
    Id_Servico: number;
    Nome: string | null;
    Titulo: string | null;
    Descricao: string | null;
    Valor: number | null;
}

export default function DisponibilidadePage() {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDisponibilidade = async () => {
            try {
                const res = await fetch("/api/interna/disponibilidade");
                const data = await res.json();
                setServicos(data);
            } catch (err) {
                console.error("Erro ao buscar disponibilidade:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDisponibilidade();
    }, []);

    return (
 <div className="p-6 md:p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Disponibilidade de Serviços
      </h1>

      {/* Tabela */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-4 text-gray-600">Carregando...</p>
        ) : servicos.length === 0 ? (
          <p className="p-4 text-gray-600">
            Nenhum serviço disponível no momento.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Nome</th>
                <th className="p-3">Título</th>
                <th className="p-3">Descrição</th>
                <th className="p-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              {servicos.map((s) => (
                <tr
                  key={s.Id_Servico}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{s.Nome || "—"}</td>
                  <td className="p-3">{s.Titulo || "—"}</td>
                  <td className="p-3">{s.Descricao || "—"}</td>
                  <td className="p-3">
                    {s.Valor ? `€ ${s.Valor}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

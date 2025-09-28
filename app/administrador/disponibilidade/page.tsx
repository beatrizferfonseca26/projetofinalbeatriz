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
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <main className="flex-1 p-6 md:p-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Disponibilidade de Serviços
                        </h1>
                    </div>
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
                                                {s.Valor !== null && s.Valor !== undefined
                                                    ? `€ ${s.Valor}`
                                                    : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
                <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
                    <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
                </footer>
            </div>
        </div>
    );
}

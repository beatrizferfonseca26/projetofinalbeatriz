'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Sidebar from "@/components/sideBar";
import bcrypt from "bcryptjs";

export default function NovoFuncionarioPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    Nome: "",
    Email: "",
    Senha: "",
    Administrador: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/interna/admin/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Funcionário cadastrado com sucesso!");
        router.push("/administrador/funcionarios");
      } else {
        alert("Erro ao cadastrar funcionário");
      }
    } catch (err) {
      console.error("Erro:", err);
      alert("Falha na conexão com o servidor");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Novo Funcionário</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="Nome"
              value={form.Nome}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="Administrador"
              checked={form.Administrador}
              onChange={handleChange}
            />
            <label className="text-sm font-medium text-gray-700">Administrador</label>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => router.push("/administrador/funcionarios")}
              type="button"
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

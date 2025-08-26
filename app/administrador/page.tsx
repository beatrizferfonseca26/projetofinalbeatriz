"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCog, Calendar, Package, Wrench, Clock } from "lucide-react";

export default function AdminDashboard() {
  const modules = [
    {
      title: "Funcionários",
      description: "Gerencie os dados dos funcionários",
      href: "/administrador/funcionarios",
      icon: <UserCog className="w-6 h-6" />,
    },
    {
      title: "Clientes",
      description: "Gerencie os dados dos clientes",
      href: "/administrador/clientes",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Serviços",
      description: "Gerencie os serviços oferecidos",
      href: "/administrador/servicos",
      icon: <Wrench className="w-6 h-6" />,
    },
    {
      title: "Produtos",
      description: "Gerencie os produtos disponíveis",
      href: "/administrador/produtos",
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: "Agendamentos",
      description: "Gerencie e cancele agendamentos",
      href: "/administrador/agendamentos",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: "Disponibilidade",
      description: "Defina horários de trabalho e disponibilidade",
      href: "/administrador/disponibilidade",
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Painel do Administrador</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <Card
            key={mod.title}
            className="p-4 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {mod.icon}
                <h2 className="text-xl font-semibold">{mod.title}</h2>
              </div>
              <p className="text-gray-600">{mod.description}</p>
              <Link href={mod.href}>
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <footer className="p-4 text-center bg-black text-white">
        <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
      </footer>
      </div>
    </main>
    
  );
}

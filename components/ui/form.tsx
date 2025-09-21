"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

export function Formulario({
  showNome = true,
  showEmail = true,
  showSenha = true,
  showMorada = true,
  showTelemovel = true,
  showNif = true,
  showDataNascimento = true,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Caixa fixa de 600x400 */}
      <div className="bg-white shadow-md rounded-xl p-6 w-[600px] h-[400px] flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Formulário
        </h2>

        {/* Área de inputs com rolagem se ultrapassar */}
        <div className="flex flex-col gap-3 overflow-y-auto pr-1">
          {showNome && (
            <Input
              label="Nome"
              size="sm"
              type="text"
              isClearable
              variant="bordered"
              placeholder="Digite o seu nome"
              labelPlacement="outside"
              
            />
          )}
          {showEmail && (
            <Input
              label="Email"
              size="sm"
              type="email"
              isClearable
              variant="bordered"
              placeholder="Digite o seu email"
              labelPlacement="outside"
            />
          )}
          {showSenha && (
            <Input
              label="Senha"
              size="sm"
              type={showPassword ? "text" : "password"}
              variant="bordered"
              placeholder="Digite a sua senha"
              labelPlacement="outside"
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              }
            />
          )}
          {showMorada && (
            <Input
              label="Morada"
              size="sm"
              type="text"
              isClearable
              variant="bordered"
              placeholder="Digite a sua morada"
              labelPlacement="outside"
            />
          )}
          {showTelemovel && (
            <Input
              label="Telemóvel"
              size="sm"
              type="tel"
              isClearable
              variant="bordered"
              placeholder="Digite o seu telemóvel"
              labelPlacement="outside"
            />
          )}
          {showNif && (
            <Input
              label="NIF"
              size="sm"
              type="text"
              isClearable
              variant="bordered"
              maxLength={6}
              pattern="[0-9]{6}"
              placeholder="6 dígitos"
              labelPlacement="outside"
            />
          )}
          {showDataNascimento && (
            <Input
              label="Data de Nascimento"
              size="sm"
              type="date"
              variant="bordered"
              labelPlacement="outside"
            />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

interface FormularioModalProps {
  showNome?: boolean;
  showEmail?: boolean;
  showSenha?: boolean;
  showMorada?: boolean;
  showTelemovel?: boolean;
  showNif?: boolean;
  showDataNascimento?: boolean;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
  initialData?: Record<string, string>;
}

export function FormularioModal({
  showNome = true,
  showEmail = true,
  showSenha = true,
  showMorada = true,
  showTelemovel = true,
  showNif = true,
  showDataNascimento = true,
  isOpen,
  setOpen,
  onSubmit,
  initialData = {},
}: FormularioModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({});
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} size="xl" onClose={handleClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Formulário</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              {showNome && (
                <Input
                  label="Nome"
                  size="sm"
                  type="text"
                  value={formData.nome || ""}
                  onChange={(e) => handleChange("nome", e.target.value)}
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
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  isClearable
                  variant="bordered"
                  placeholder="xxxx@xxxx.xxx"
                  labelPlacement="outside"
                />
              )}
              {showSenha && (
                <Input
                  label="Senha"
                  size="sm"
                  type={showPassword ? "text" : "password"}
                  value={formData.senha || ""}
                  onChange={(e) => handleChange("senha", e.target.value)}
                  variant="bordered"
                  placeholder="Digite a sua senha com 6 dígitos"
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
                  value={formData.morada || ""}
                  onChange={(e) => handleChange("morada", e.target.value)}
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
                  value={formData.telemovel || ""}
                  onChange={(e) => handleChange("telemovel", e.target.value)}
                  isClearable
                  maxLength={9}
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
                  value={formData.nif || ""}
                  onChange={(e) => handleChange("nif", e.target.value)}
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
                  value={formData.dataNascimento || ""}
                  onChange={(e) => handleChange("dataNascimento", e.target.value)}
                  variant="bordered"
                  labelPlacement="outside"
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Fechar
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Enviar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}

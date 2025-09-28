import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  onSubmit: (formData: { nome: string; email: string; senha: string }) => Promise<void>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  initialData?: { nome?: string; email?: string };
}

export function FormularioModalFuncionario({
  showNome,
  showEmail,
  showSenha,
  showMorada,
  showTelemovel,
  showNif,
  showDataNascimento,
  onSubmit,
  open,
  setOpen,
  initialData,
}: FormularioModalProps) {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setNome(initialData?.nome || "");
    setEmail(initialData?.email || "");
    setSenha("");
  }, [initialData, open]);

  const handleClose = () => {
    setOpen(false);
    setNome("");
    setEmail("");
    setSenha("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ nome, email, senha });
    setNome("");
    setEmail("");
    setSenha("");
  };

  return (
    <Modal isOpen={open} size="xl" onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Formulário
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {showNome && (
                  <Input
                    label="Nome"
                    size="sm"
                    type="text"
                    isClearable
                    variant="bordered"
                    placeholder="Digite o seu nome"
                    labelPlacement="outside"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                  />
                )}
                {showEmail && (
                  <Input
                    label="Email"
                    size="sm"
                    type="email"
                    isClearable
                    variant="bordered"
                    placeholder="xxxx@xxxx.xxx"
                    labelPlacement="outside"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                )}
                {showSenha && (
                  <Input
                    label="Senha"
                    size="sm"
                    type={showPassword ? "text" : "password"}
                    variant="bordered"
                    placeholder="Digite a sua senha com 6 dígitos"
                    labelPlacement="outside"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="focus:outline-none"
                        tabIndex={-1}
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
                {/* Campos extras podem ser adicionados aqui se necessário */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button color="danger" variant="light" onPress={onClose} type="button">
                    Fechar
                  </Button>
                  <Button color="primary" type="submit">
                    Enviar
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
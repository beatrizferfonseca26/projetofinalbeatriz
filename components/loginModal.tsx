'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from './ui/button';
import { toast } from 'react-toastify';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisible, setSenhaVisible] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      senha,
    });

    if (result?.error) {
      setError('Email ou senha inválidos.');
      return;
    }

    // 🔹 Buscar sessão atualizada após login
    const session = await fetch('/api/auth/session').then((res) => res.json());

    // 🔹 Redirecionar conforme o tipo do utilizador
    if (session?.tipo === 'administrador') {
      router.push('/administrador');
    } else if (session?.tipo === 'funcionario') {
      router.push('/funcionarios');
    } else if (session?.tipo === 'cliente') {
      router.push('/clientes');
    } else {
      router.push('/');
    }

    toast.success('Login realizado com sucesso!');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4 text-center">Login</h3>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full pr-20"
              required
            />
            {email && (
              <button
                type="button"
                onClick={() => setEmail('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm px-2 py-1"
                tabIndex={-1}
              >
                Limpar
              </button>
            )}
          </div>

          <div className="relative">
            <input
              type={senhaVisible ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border p-2 rounded w-full pr-28"
              required
            />
            <button
              type="button"
              onClick={() => setSenhaVisible((v) => !v)}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm px-2 py-1"
              tabIndex={-1}
            >
              {senhaVisible ? 'Ocultar' : 'Ver'}
            </button>
            {senha && (
              <button
                type="button"
                onClick={() => setSenha('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm px-2 py-1"
                tabIndex={-1}
              >
                Limpar
              </button>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            variant="primary"
            type="submit"
            loadingText="Login..."
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Entrar
          </Button>

          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            type="button"
            onClick={onSwitchToRegister}
            className="bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition"
          >
            Criar Conta
          </Button>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from './ui/button';
type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      senha,
    });

    if (result?.error) {
      setError('Email ou senha inválidos.');
    } else {
      const session = await fetch('/api/auth/session').then((res) => res.json());

      if (session.tipo === 'administrador') {
        router.push('/administrador');
      } else if (session.tipo === 'funcionario') {
        router.push('/funcionarios');
      } else if (session.tipo === 'cliente') {
        router.push('/clientes');
      } else {
        router.push('/');
      }

    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative animate-fade-in">
        {/* Botão X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4 text-center">Login</h3>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border p-2 rounded"
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Botão Entrar */}
          <Button
            variant='primary'
            type="submit"
            loadingText='Login...'
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

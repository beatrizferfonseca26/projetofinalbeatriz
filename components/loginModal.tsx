'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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

      if (session.tipo === 'admin') {
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
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md animate-fade-in">
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

        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Entrar
        </button>
      </form>

      <button
        onClick={onClose}
        className="text-sm text-gray-500 hover:underline mt-3 block text-center"
      >
        Cancelar
      </button>

      <button
        onClick={onSwitchToRegister}
        className="text-sm text-blue-600 hover:underline mt-2 block text-center"
      >
        Criar Conta
      </button>
    </div>
  );
}

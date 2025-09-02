'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Button from './ui/button';
import { toast } from 'react-toastify';
type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [morada, setMorada] = useState('');
  const [nif, setNif] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/interna/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          senha,
          telemovel,
          dataNascimento,
          morada,
          nif: Number(nif),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Erro ao registrar usuário.');
        return;
      }

      setSuccess('Conta criada com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      setTelemovel('');
      setDataNascimento('');
      setMorada('');
      setNif('');
      if (res.ok) {
        toast.success('Conta criada com sucesso!');
        onClose();
      }
    } catch (err) {
      setError('Erro ao registrar usuário.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl mx-4 bg-white rounded-xl shadow-2xl p-8 animate-fade-in">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-4 text-center">Criar Conta</h2>

        {/* Formulário */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            placeholder="Telemóvel"
            value={telemovel}
            onChange={(e) => setTelemovel(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            placeholder="Morada"
            value={morada}
            onChange={(e) => setMorada(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="number"
            placeholder="NIF"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <Button 
          variant='primary'
            type="submit"
            loadingText='Registando...'
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Registar
          </Button>
        </form>
      </div>

      {/* Tailwind animation (CSS custom) */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeInScale 0.3s ease-out;
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';

interface Imagem {
  Id_Imagem: number;
  CaminhoImagem?: string | null;
  AltText?: string | null;
}

interface Produto {
  Id_Produto: number;
  Nome?: string | null;
  imagens: Imagem[];
}

interface Servico {
  Id_Servico: number;
  Nome?: string | null;
  Descricao?: string | null;
  Duracao?: number | null;
  Valor?: number | null;
  produtos?: Produto | null;
}

export default function ServicosCard() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const res = await fetch('/api/interna/servicos');
        if (!res.ok) {
          throw new Error(`Erro ao buscar serviços: ${res.status}`);
        }
        const data: Servico[] = await res.json();
        setServicos(data);
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Carregando serviços...</p>;
  }

  if (servicos.length === 0) {
    return <p className="text-center py-8">Nenhum serviço disponível no momento.</p>;
  }

  return (
    <div className="w-full px-4 py-8 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6 text-center">Nossos Serviços</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {servicos.map((servico) => {
          const produto = servico.produtos;
          const imagem = produto?.imagens[0];
          const imageUrl = imagem?.CaminhoImagem || '/placeholder.jpg';
          const altText = imagem?.AltText || servico.Nome || 'Imagem do serviço';

          return (
            <div
              key={servico.Id_Servico}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={imageUrl}
                alt={altText}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-2">{servico.Nome}</h3>
                <p className="text-gray-600 flex-grow">{servico.Descricao}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Duração: {servico.Duracao ?? '?'} min
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    € {servico.Valor ?? '?'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

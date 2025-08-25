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
  detalhes?: string[]; // Adapte conforme sua API
}

const mockIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={48} height={48}>
    <circle cx="100" cy="100" r="90" fill="#80a5b6" />
    <text x="100" y="115" textAnchor="middle" fontSize="60" fill="#fff" fontWeight="bold">S</text>
  </svg>
);

export default function ServicosCard() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);
  const [openToggle, setOpenToggle] = useState<{ [key: number]: number | null }>({});

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
    <section className="w-full px-4 py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {servicos.map((servico, idx) => {
          const produto = servico.produtos;
          const imagem = produto?.imagens?.[0];
          const imageUrl = imagem?.CaminhoImagem || '/placeholder.jpg';
          const altText = imagem?.AltText || servico.Nome || 'Imagem do serviço';

          // Use detalhes reais se vierem da API, senão mantenha exemplo
          const detalhes = servico.detalhes?.length
            ? servico.detalhes.map((d) => ({ titulo: d, texto: '' }))
            : [
                { titulo: 'Piscina Dinâmica', texto: 'Envolva-se numa piscina de água termal com jatos de hidromassagem, cascatas e zonas de relaxamento que revitalizam o corpo e a mente.' },
                { titulo: 'Duche de Jato', texto: 'Um duche de projeção de água termal a alta pressão, ideal para estimular a circulação e tonificar os tecidos.' },
                { titulo: 'Duche Circular', texto: 'Uma experiência de duche envolvente, com múltiplos jatos suaves que proporcionam um relaxamento completo.' },
              ];

          return (
            <div
              key={servico.Id_Servico}
              className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden"
            >
              {/* Topo: Ícone, nome e valor */}
              <div className="flex flex-col items-center justify-center p-8 bg-white border-b border-gray-100">
                <div className="mb-3">{mockIcon}</div>
                <h6 className="text-xl font-bold mb-1 text-center uppercase tracking-wide">{servico.Nome}</h6>
                <div className="text-base font-semibold text-gray-700 mb-2">
                  {servico.Valor ? `€ ${servico.Valor}` : '--'}
                </div>
                <img
                  src={imageUrl}
                  alt={altText}
                  className="w-full max-w-xs h-40 object-cover rounded-lg shadow mb-2"
                  style={{ background: '#f3f3f3' }}
                />
              </div>
              {/* Conteúdo: descrição, detalhes, toggles e botão */}
              <div className="flex-1 flex flex-col justify-between p-8 bg-gray-50">
                <div>
                  <p className="mb-2 text-gray-700">{servico.Descricao}</p>
                  <p className="mb-2 text-gray-700">Inclui:</p>
                  {/* Toggles */}
                  <div className="mb-4">
                    {detalhes.map((det, i) => (
                      <div key={i} className="mb-2 border-b border-gray-200">
                        <button
                          className="flex items-center w-full text-left py-2 focus:outline-none"
                          onClick={() =>
                            setOpenToggle((prev) => ({
                              ...prev,
                              [servico.Id_Servico]: prev[servico.Id_Servico] === i ? null : i,
                            }))
                          }
                        >
                          <span className="mr-2">
                            {openToggle[servico.Id_Servico] === i ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            )}
                          </span>
                          <span className="font-medium">{det.titulo}</span>
                        </button>
                        {openToggle[servico.Id_Servico] === i && det.texto && (
                          <div className="mt-2 text-gray-600 text-sm">
                            {det.texto}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition duration-200">
                    Comprar Agora
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

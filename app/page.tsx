'use client';

import { useRef, useState, useEffect } from 'react';
import LoginModal from '@/components/loginModal';
import RegisterModal from '@/components/registerModal';

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
  Nome: string;
  Descricao?: string;
  Duracao?: number;
  Valor?: number;
  produtos?: Produto | null;
}

function ServicosCard({
  servicos,
  detalhesVisiveis,
  toggleDetalhes,
}: {
  servicos: Servico[];
  detalhesVisiveis: Record<number, boolean>;
  toggleDetalhes: (id: number) => void;
}) {
  return (
    <section className="w-full bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Serviços Disponíveis</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {servicos.map((servico) => {
          const produto = servico.produtos;
          const imagem = produto?.imagens[0];
          const imageUrl = imagem?.CaminhoImagem || '/placeholder.png';
          const altText = imagem?.AltText || servico.Nome || 'Imagem do serviço';
          const detalhesAbertos = detalhesVisiveis[servico.Id_Servico];

          return (
            <div
              key={servico.Id_Servico}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <img src={imageUrl} alt={altText} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-2">{servico.Nome}</h3>
                {detalhesAbertos ? (
                  <>
                    <p className="text-gray-600">{servico.Descricao}</p>
                    <button
                      onClick={() => toggleDetalhes(servico.Id_Servico)}
                      className="mt-4 text-indigo-600 hover:underline self-start"
                    >
                      Mostrar menos
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 line-clamp-3">{servico.Descricao}</p>
                    <button
                      onClick={() => toggleDetalhes(servico.Id_Servico)}
                      className="mt-4 text-indigo-600 hover:underline self-start"
                    >
                      Ver mais
                    </button>
                  </>
                )}
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700">
                    Duração: {servico.Duracao ?? '?'} min
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    R$ {servico.Valor ?? '?'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [detalhesVisiveis, setDetalhesVisiveis] = useState<Record<number, boolean>>({});

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOpenModal = () => {
    setIsLoginModalOpen(true);

    setTimeout(() => {
      modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  useEffect(() => {
    fetch('/api/interna/servicos/disponibilidade')
      .then(res => res.json())
      .then(data => setServicos(data))
      .catch(console.error);
  }, []);

  function toggleDetalhes(id: number) {
    setDetalhesVisiveis(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div>
      <main
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          minWidth: '100vw',
          padding: 0,
          margin: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'whitesmoke',
            color: 'black',
            height: '100%',
            gap: '1rem',
          }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center' }}>
            Sallon - Beleza com hora marcada
          </h2>

          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Agende já
          </button>
        </div>

        <div
          style={{
            flex: 1,
            height: '100%',
            backgroundImage: 'url(/salao.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </main>

      {/* Aqui está o container com os cards de serviços */}
      <ServicosCard
        servicos={servicos}
        detalhesVisiveis={detalhesVisiveis}
        toggleDetalhes={toggleDetalhes}
      />

      {/* Modais com fundo escurecido, sobrepostos à página */}
      <div ref={modalRef}>
        {isLoginModalOpen && (
          <div
            style={{
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'black',
              padding: '2rem 0',
            }}
          >
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
              onSwitchToRegister={() => {
                setIsLoginModalOpen(false);
                setIsRegisterModalOpen(true);
              }}
            />
          </div>
        )}

        {isRegisterModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
          </div>
        )}
      </div>

      <footer
        className="p-2 text-center md:block hidden"
        style={{ borderTop: '1px', padding: '20px', backgroundColor: 'black', color: 'white' }}
      >
        <p className="text-xs font-normal">Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

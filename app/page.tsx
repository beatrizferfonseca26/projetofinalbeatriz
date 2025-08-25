'use client';

import { useRef, useState, useEffect } from 'react';
import LoginModal from '@/components/loginModal';
import RegisterModal from '@/components/registerModal';
import NavBar from '@/components/navBar';
import ServicosCard from '@/components/servicosCard';

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

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Refs para as seções
  const mainRef = useRef<HTMLDivElement | null>(null);
  const sobreRef = useRef<HTMLElement | null>(null);
  const servicosRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOpenModal = () => {
    setIsLoginModalOpen(true);
    setTimeout(() => {
      modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Exibir navbar quando main sai do topo
  useEffect(() => {
    function handleScroll() {
      if (mainRef.current) {
        const mainBottom = mainRef.current.getBoundingClientRect().bottom;
        setShowNav(mainBottom <= 0);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Atualiza a seção ativa conforme o scroll
  useEffect(() => {
    function onScroll() {
      const mainTop = mainRef.current?.getBoundingClientRect().top ?? 0;
      const sobreTop = sobreRef.current?.getBoundingClientRect().top ?? 0;
      const servicosTop = servicosRef.current?.getBoundingClientRect().top ?? 0;

      if (mainTop <= 50 && sobreTop > 50) {
        setActiveSection('inicio');
      } else if (sobreTop <= 50 && servicosTop > 50) {
        setActiveSection('sobre-nos');
      } else if (servicosTop <= 50) {
        setActiveSection('servicos-card');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navbar customizada
  const navLinks = [
    { name: 'Início', id: 'inicio' },
    { name: 'Sobre Nós', id: 'sobre-nos' },
    { name: 'Serviços', id: 'servicos-card' },
  ];

return (
  <div>
    {/* Navbar dinâmica */}
    {showNav && (
      <nav className="bg-black text-white px-6 py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-white">Sallon</div>
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === 'inicio') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    document
                      .getElementById(link.id)
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`transition-colors duration-300 px-2 py-1 rounded ${
                  activeSection === link.id
                    ? 'bg-gray-700 text-white'
                    : 'text-white hover:bg-gray-800 hover:text-indigo-300'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    )}

    {/* HERO PRINCIPAL */}
    <main
      ref={mainRef}
      id="inicio"
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh',
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

        <button
          onClick={() =>
            document
              .getElementById('sobre-nos')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Sobre Nós
        </button>

        <button
          onClick={() =>
            document
              .getElementById('servicos-card')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Serviços
        </button>
      </div>

      <div
        style={{
          flex: 1,
          backgroundImage: 'url(/salao1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </main>
      {/* SOBRE NÓS */}
      <section
        id="sobre-nos"
        ref={sobreRef}
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '3rem 1rem',
          textAlign: 'center',
        }}
      >
        <h2 className="text-3xl font-extrabold mb-6">Sobre nós</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed">
            No coração da nossa cidade, nasceu o <span className="text-indigo-400 font-bold">Sallon</span>, um espaço pensado para valorizar a beleza, o bem-estar e a autoestima de cada cliente. O que começou como um sonho de oferecer cuidados personalizados e de qualidade, hoje é uma realidade que combina tradição, técnica e inovação.<br /><br />
          Somos apaixonados pelo que fazemos. Nossa equipe é formada por <span className="text-indigo-400 font-bold">profissionais qualificados</span>, sempre atualizados com as últimas tendências em cortes, coloração, tratamentos capilares, manicure, pedicure, maquiagem, depilação e estética. Mais do que serviços, entregamos experiências — cada atendimento é planejado para que você se sinta único(a) e especial.<br /><br />
          Além de cuidar da sua beleza, oferecemos uma linha exclusiva de produtos para que você mantenha em casa os resultados conquistados no salão. E para facilitar ainda mais sua rotina, desenvolvemos uma plataforma online onde você pode agendar seu horário e adquirir produtos com poucos cliques, no conforto e segurança que merece.<br /><br />
          No Sallon, acreditamos que a beleza é única, e nosso propósito é realçá-la todos os dias. Venha viver essa experiência com a gente.
        </p>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos-card" ref={servicosRef}>
        <ServicosCard />
      </section>

      {/* MODAIS */}
      <div ref={modalRef}>
        {isLoginModalOpen && (
          <div className="bg-black p-8">
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="p-4 text-center bg-black text-white">
        <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

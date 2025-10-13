// src/app/page.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import LoginModal from '@/components/loginModal';
import RegisterModal from '@/components/registerModal';
import NavBar from '@/components/navBar';
import ServicosCard from '@/components/servicosCard';
import Button from '@/components/ui/button';
import { motion } from 'framer-motion';

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
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

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

  // Scroll para serviços após 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      servicosRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Atualiza seção ativa
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

  return (
    <div>
      {/* Navbar dinâmica */}
      {showNav && (
        <NavBar
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenRegister={() => setIsRegisterModalOpen(true)}
        />
      )}

      {/* HERO PRINCIPAL */}
      <main
        ref={mainRef}
        id="inicio"
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/salao1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay semi-transparente */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1,
          }}
        />

        {/* Texto central */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            color: 'white',
            textAlign: 'center',
            padding: '0 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: 0 }}>
            Sallon
          </h1>
          <h2 style={{ fontSize: '2rem', fontWeight: 500, margin: 0 }}>
            Beleza com hora marcada
          </h2>
          <Button
            variant="primary"
            onClick={handleOpenModal}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Agende já
          </Button>
        </div>
      </main>

      {/* SOBRE NÓS */}
      <section id="sobre-nos" ref={sobreRef} className="bg-black text-white py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-white text-black rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-extrabold mb-6 text-center">Sobre nós</h2>
            <p className="text-lg leading-relaxed">
              No coração da nossa cidade, nasceu o Sallon, um espaço pensado para valorizar a beleza, o
              bem-estar e a autoestima de cada cliente. O que começou como um sonho de oferecer cuidados
              personalizados e de qualidade, hoje é uma realidade que combina tradição, técnica e inovação.
              <br /><br />
              Somos apaixonados pelo que fazemos. Nossa equipe é formada por profissionais qualificados,
              sempre atualizados com as últimas tendências em cortes, coloração, tratamentos capilares,
              manicure, pedicure, maquiagem, depilação e estética. Mais do que serviços, entregamos
              experiências — cada atendimento é planejado para que você se sinta único(a) e especial.
              <br /><br />
              Além de cuidar da sua beleza, oferecemos uma linha exclusiva de produtos para que você
              mantenha em casa os resultados conquistados no salão. E para facilitar ainda mais sua rotina,
              desenvolvemos uma plataforma online onde você pode agendar seu horário e adquirir produtos
              com poucos cliques, no conforto e segurança que merece.
              <br /><br />
              No Sallon, acreditamos que a beleza é única, e nosso propósito é realçá-la todos os dias.
              Venha viver essa experiência com a gente.
            </p>
          </div>

          <motion.div
            className="text-center text-lg leading-relaxed"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p>{/* Conteúdo/ilustração adicional aqui */}</p>
          </motion.div>
        </div>
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
            <RegisterModal
              isOpen={isRegisterModalOpen}
              onClose={() => setIsRegisterModalOpen(false)}
            />
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

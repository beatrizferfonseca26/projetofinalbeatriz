'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavBarProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

export default function NavBar({ onOpenLogin, onOpenRegister }: NavBarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Detecta se houve scroll para adicionar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // inicializa
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Início', href: '/' },
    { name: 'Agende já', action: onOpenLogin },
    { name: 'Sobre Nós', href: '/#sobre-nos' },
    { name: 'Serviços', href: '/#servicos-card' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 px-6 py-4 ${
        scrolled || pathname !== '/' ? 'bg-black text-white shadow-md' : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">Sallon</div>
        <div className="flex gap-6">
          {links.map((link) =>
            link.action ? (
              <button
                key={link.name}
                onClick={link.action}
                className="transition-colors duration-300 px-2 py-1 rounded hover:bg-gray-800 hover:text-indigo-300"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href!}
                className="transition-colors duration-300 px-2 py-1 rounded hover:bg-gray-800 hover:text-indigo-300"
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

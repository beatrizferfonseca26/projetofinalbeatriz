'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  // Atualiza hash quando muda
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  const links = [
    { name: 'Início', href: '/' },
    { name: 'Sobre Nós', href: '/#sobre-nos' },
    { name: 'Serviços', href: '/#servicos-card' },
  ];

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-white">Sallon</div>

        {/* Links */}
        <div className="flex gap-6">
          {links.map((link) => {
            const linkHash = link.href.includes('#') ? link.href.split('#')[1] : '';
            const isActive =
              (link.href === '/' && pathname === '/' && !hash) || 
              (linkHash && `#${linkHash}` === hash); 

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-300 px-2 py-1 rounded ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-white hover:bg-gray-800 hover:text-indigo-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

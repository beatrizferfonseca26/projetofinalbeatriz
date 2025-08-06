// components/ScrollLink.tsx

'use client';

import { MouseEvent } from 'react';

interface ScrollLinkProps {
  to: string; // ID do elemento alvo
  children: React.ReactNode;
  offset?: number; // Offset opcional
  className?: string; // Estilização opcional
}

export default function ScrollLink({ to, children, offset = 0, className }: ScrollLinkProps) {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(to);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

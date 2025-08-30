// components/ui/Button.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils'; // helper opcional (classe condicional)
import { Loader2 } from 'lucide-react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive'; // 🔹 nova variant
  type?: 'button' | 'submit';
  onClick?: () => void | Promise<void>;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  className,
  disabled = false,
}: ButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!onClick) return;
    try {
      setLoading(true);
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200',
        variant === 'primary' &&
          'bg-black text-white hover:bg-gray-800 disabled:bg-gray-500',
        variant === 'secondary' &&
          'bg-gray-300 text-black hover:bg-gray-400 disabled:bg-gray-400',
        variant === 'destructive' &&
          'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400', // 🔹 estilo destructive
        (disabled || loading) && 'cursor-not-allowed opacity-80',
        className
      )}
    >
      {loading && <Loader2 className="animate-spin h-4 w-4" />}
      {children}
    </button>
  );
}

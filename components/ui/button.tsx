'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive';
  type?: 'button' | 'submit';
  onClick?: () => void | Promise<void>;
  className?: string;
  disabled?: boolean;
  loadingText?: string; // 🔹 novo: texto customizável no loading
};

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  className,
  disabled = false,
  loadingText = 'Processando...', // 🔹 valor default
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
        'flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 relative overflow-hidden',
        variant === 'primary' &&
          'bg-black text-white hover:bg-gray-800 disabled:bg-gray-500',
        variant === 'secondary' &&
          'bg-gray-300 text-black hover:bg-gray-400 disabled:bg-gray-400',
        variant === 'destructive' &&
          'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400',
        (disabled || loading) && 'cursor-not-allowed opacity-80',
        className
      )}
    >
      {variant === 'primary' && loading ? (
        <>
          {/* Spinner circular */}
          <div
            style={{
              width: '18px',
              height: '18px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />

          {/* Texto + barra shimmer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: '700' }}>
              {loadingText}
            </span>
            <div
              style={{
                width: '140px',
                height: '3px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '50%',
                  height: '100%',
                  backgroundColor: 'white',
                  borderRadius: '2px',
                  animation: 'shimmer 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </>
      ) : (
        children
      )}

      {/* 🔹 animações */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(50%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </button>
  );
}

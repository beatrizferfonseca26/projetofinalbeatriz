'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type ConfirmationResult = {
  success?: boolean;
  message: string;
  error?: string;
  expired?: boolean;
  alreadyConfirmed?: boolean;
  agendamento?: {
    Id_Agendamento: number;
    cliente: string;
    servico: string;
    data: string;
    hora: string;
    profissional: string;
    status?: string;
  };
};

export default function ConfirmacaoPage() {
  const params = useParams();
  const token = params.token as string;
  const [result, setResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setResult({ error: 'Token inválido', message: 'Link de confirmação inválido' });
      setLoading(false);
      return;
    }

    const processConfirmation = async () => {
      try {
        const response = await fetch(`/api/confirmacao/${token}`);
        const data = await response.json();
        
        setResult(data);
      } catch (error) {
        console.error('Erro ao processar confirmação:', error);
        setResult({ 
          error: 'Erro de comunicação', 
          message: 'Erro ao processar confirmação. Tente novamente.' 
        });
      } finally {
        setLoading(false);
      }
    };

    processConfirmation();
  }, [token]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-PT');
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      return timeString.slice(0, 5);
    } catch {
      return timeString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Processando confirmação...</h2>
          <p className="text-gray-600">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold text-center">Confirmação de Agendamento</h1>
        </div>

        <div className="p-6">
          {result?.success && (
            <>
              {/* Sucesso */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-green-600 mb-2">✅ Confirmado com Sucesso!</h2>
                <p className="text-gray-600">{result.message}</p>
              </div>

              {/* Detalhes do Agendamento */}
              {result.agendamento && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Detalhes do Agendamento:</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Cliente:</strong> {result.agendamento.cliente}</div>
                    <div><strong>Serviço:</strong> {result.agendamento.servico}</div>
                    <div><strong>Data:</strong> {formatDate(result.agendamento.data)}</div>
                    <div><strong>Hora:</strong> {formatTime(result.agendamento.hora)}</div>
                    <div><strong>Profissional:</strong> {result.agendamento.profissional}</div>
                    <div className="pt-2">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Status: {result.agendamento.status || 'Confirmado'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {result?.alreadyConfirmed && (
            <>
              {/* Já confirmado */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-blue-600 mb-2">ℹ️ Já Confirmado</h2>
                <p className="text-gray-600">{result.message}</p>
              </div>

              {/* Detalhes do Agendamento */}
              {result.agendamento && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Detalhes do Agendamento:</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Cliente:</strong> {result.agendamento.cliente}</div>
                    <div><strong>Serviço:</strong> {result.agendamento.servico}</div>
                    <div><strong>Data:</strong> {formatDate(result.agendamento.data)}</div>
                    <div><strong>Hora:</strong> {formatTime(result.agendamento.hora)}</div>
                    <div><strong>Profissional:</strong> {result.agendamento.profissional}</div>
                  </div>
                </div>
              )}
            </>
          )}

          {(result?.error || result?.expired) && (
            <>
              {/* Erro */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-red-600 mb-2">
                  {result.expired ? '⏰ Link Expirado' : '❌ Erro na Confirmação'}
                </h2>
                <p className="text-gray-600">{result.message}</p>
              </div>

              {result.expired && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 O que fazer:</strong> Entre em contato conosco para solicitar um novo link de confirmação 
                    ou ligue para confirmar seu agendamento.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Ações */}
          <div className="text-center space-y-3">
            <Link 
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Voltar ao Site
            </Link>
            
            <div className="text-sm text-gray-500">
              Precisa de ajuda? Entre em contato conosco.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t">
          <p className="text-xs text-gray-500 text-center">
            Este link é único e pessoal. Não compartilhe com terceiros.
          </p>
        </div>
      </div>
    </div>
  );
}
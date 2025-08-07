// Arquivo: /app/api/agendamentos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar agendamentos
export async function GET() {
  try {
    const agendamentos = await prisma.agendamentos.findMany({
      orderBy: [
        { Data: 'desc' },
        { HoraInicio: 'desc' },
      ],
      include: {
        servicos: true,
        clientes: true,
        funcionarios: true,
      },
    });

    return NextResponse.json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}

// POST: Criar um novo agendamento
export async function POST(req: Request) {
  try {
    const {
      Id_Servico,
      Id_Cliente,
      Id_Funcionario,
      Data,
      HoraInicio,
      Observacoes,
    } = await req.json();

    // Buscar a duração do serviço
    const servico = await prisma.servicos.findUnique({
      where: { Id_Servico },
    });


    if (!servico || servico.Duracao === null) {
      return NextResponse.json({ error: 'Serviço não encontrado ou sem duração definida' }, { status: 400 });
    }

    // Calcular HoraFinal
    const horaInicioDate = new Date(`${Data}T${HoraInicio}`);
    const horaFinalDate = new Date(horaInicioDate.getTime() + servico.Duracao * 60000); // duração em minutos

    // Criar agendamento
    await prisma.agendamentos.create({
      data: {
        Id_Servico,
        Id_Cliente,
        Id_Funcionario: Id_Funcionario || null,
        Data: new Date(Data),
        HoraInicio: horaInicioDate,
        HoraFinal: horaFinalDate,
        Status: 'Marcado',
        Observacoes: Observacoes || '',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json({ error: 'Erro ao criar agendamento' }, { status: 500 });
  }
}

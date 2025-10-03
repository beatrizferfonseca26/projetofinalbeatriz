// PUT: Editar informações do pagamento
export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const { Id_Pagamentos, Status, Valor, Modalidade, Fatura } = body;
		if (!Id_Pagamentos) {
			return NextResponse.json({ error: 'Id_Pagamentos é obrigatório' }, { status: 400 });
		}

		const dataToUpdate: any = {};
		if (Status !== undefined) dataToUpdate.Status = Status;
		if (Valor !== undefined) dataToUpdate.Valor = Valor;
		if (Modalidade !== undefined) dataToUpdate.Modalidade = Modalidade;
		if (Fatura !== undefined) dataToUpdate.Fatura = Fatura;

		const pagamentoAtualizado = await prisma.pagamentos.update({
			where: { Id_Pagamentos: Number(Id_Pagamentos) },
			data: dataToUpdate,
		});

		return NextResponse.json(pagamentoAtualizado);
	} catch (error) {
		console.error('Erro ao atualizar pagamento:', error);
		return NextResponse.json({ error: 'Erro ao atualizar pagamento' }, { status: 500 });
	}
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Listar todos os agendamentos Confirmados ou Realizados, com info de pagamento (se houver)
export async function GET() {
	try {
		const agendamentos = await prisma.agendamentos.findMany({
			where: {
				OR: [
					{ Status: 'Confirmado' },
					{ Status: 'Realizado' },
				],
			},
			include: {
				clientes: true,
				servicos: true,
				pagamentos: true,
			},
			orderBy: { Data: 'desc' },
		});

		// Formatar para o front
		const result = agendamentos.map((ag) => ({
			Id_Agendamento: ag.Id_Agendamento,
			Data: ag.Data ? ag.Data.toISOString().split('T')[0] : '',
			HoraInicio: ag.HoraInicio instanceof Date ? ag.HoraInicio.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }) : '',
			Servico: ag.servicos?.Nome || '',
			Cliente: ag.clientes?.Nome || '',
			Status: ag.Status || '',
			Pagamento: ag.pagamentos[0]
				? {
						Id_Pagamentos: ag.pagamentos[0].Id_Pagamentos,
						Status: ag.pagamentos[0].Status,
						Valor: ag.pagamentos[0].Valor,
						Modalidade: ag.pagamentos[0].Modalidade,
						Fatura: ag.pagamentos[0].Fatura,
					}
				: null,
		}));

		return NextResponse.json(result);
	} catch (error) {
		console.error('Erro ao buscar agendamentos/pagamentos:', error);
		return NextResponse.json({ error: 'Erro ao buscar agendamentos/pagamentos' }, { status: 500 });
	}
}

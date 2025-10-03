"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sideBar";
import Button from "@/components/ui/button";

type EditPagamento = {
	Status: string;
	Valor: number;
	Modalidade: string;
	Fatura?: number;
};

type Pagamento = {
	Id_Agendamento: number;
	Data: string;
	HoraInicio: string;
	Servico: string;
	Cliente: string;
	Status: string;
	Pagamento: {
		Id_Pagamentos: number;
		Status: string;
		Valor: number;
		Modalidade: string | null;
		Fatura: number | null;
	} | null;
};

export default function PagamentosAdminPage() {
	const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
	const [loading, setLoading] = useState(true);
	const [editId, setEditId] = useState<number | null>(null);
	const [editFields, setEditFields] = useState<Partial<EditPagamento>>({});

	useEffect(() => {
		fetchPagamentos();
	}, []);

	const fetchPagamentos = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/interna/admin/pagamentos");
			const data = await res.json();
			setPagamentos(Array.isArray(data) ? data : []);
		} catch (err) {
			setPagamentos([]);
		} finally {
			setLoading(false);
		}
	};

	// Handler para editar
	const handleEdit = (pagamento: Pagamento) => {
			setEditId(pagamento.Pagamento?.Id_Pagamentos || -pagamento.Id_Agendamento); // negativo para novo
			setEditFields({
				Status: pagamento.Pagamento?.Status ?? '',
				Valor: pagamento.Pagamento?.Valor ?? 0,
				Modalidade: pagamento.Pagamento?.Modalidade ?? '',
				Fatura: pagamento.Pagamento?.Fatura ?? undefined,
			});
	};

	// Handler para salvar
		const handleSave = async (id: number, agendamentoId: number) => {
			try {
				let res;
				if (id > 0) {
					// Atualizar pagamento existente
					res = await fetch('/api/interna/admin/pagamentos', {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ Id_Pagamentos: id, ...editFields }),
					});
				} else {
					// Criar novo pagamento
					res = await fetch('/api/interna/admin/pagamentos', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ ...editFields, Id_Agendamento: agendamentoId }),
					});
				}
				if (res.ok) {
					await fetchPagamentos();
					setEditId(null);
					setEditFields({});
				} else {
					alert('Erro ao salvar pagamento');
				}
			} catch {
				alert('Erro ao salvar pagamento');
			}
		};

	// Handler para cancelar edição
	const handleCancel = () => {
		setEditId(null);
		setEditFields({});
	};

	return (
		<div className="flex min-h-screen bg-gray-100">
			<Sidebar />
			<div className="flex-1 flex flex-col p-8">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Gestão de Pagamentos</h2>
				</div>

				{loading ? (
					<p className="text-gray-500">Carregando pagamentos...</p>
				) : pagamentos.length === 0 ? (
					<p className="text-gray-500">Nenhum pagamento encontrado.</p>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white rounded shadow">
							<thead>
								<tr className="bg-gray-200 text-gray-700 text-sm">
									<th className="py-2 px-3 text-left">Serviço</th>
									<th className="py-2 px-3 text-left">Cliente</th>
									<th className="py-2 px-3 text-left">Data</th>
									<th className="py-2 px-3 text-left">Hora</th>
									<th className="py-2 px-3 text-left">Valor</th>
									<th className="py-2 px-3 text-left">Status Agendamento</th>
									<th className="py-2 px-3 text-left">Status Pagamento</th>
									<th className="py-2 px-3 text-left">Modalidade</th>
									<th className="py-2 px-3 text-left">Fatura</th>
									<th className="py-2 px-3 text-left">Ações</th>
								</tr>
							</thead>
							<tbody>
												{pagamentos.map((p) => (
													<tr key={p.Id_Agendamento} className="border-b last:border-none hover:bg-gray-50">
														<td className="py-2 px-3">{p.Servico}</td>
														<td className="py-2 px-3">{p.Cliente}</td>
														<td className="py-2 px-3">{p.Data}</td>
														<td className="py-2 px-3">{p.HoraInicio}</td>
														<td className="py-2 px-3">
															{editId === (p.Pagamento?.Id_Pagamentos || -p.Id_Agendamento) ? (
																<input
																	type="number"
																	className="border rounded px-2 py-1 w-24"
																	value={editFields.Valor ?? ''}
																	onChange={e => setEditFields(f => ({ ...f, Valor: Number(e.target.value) }))}
																/>
															) : (
																p.Pagamento ? <>€ {p.Pagamento.Valor?.toFixed(2)}</> : <span className="text-gray-400">-</span>
															)}
														</td>
														<td className="py-2 px-3">{p.Status}</td>
														<td className="py-2 px-3">
															{editId === (p.Pagamento?.Id_Pagamentos || -p.Id_Agendamento) ? (
																<select
																	className="border rounded px-2 py-1"
																	value={editFields.Status ?? ''}
																	onChange={e => setEditFields(f => ({ ...f, Status: e.target.value }))}
																>
																	<option value="">Selecione</option>
																	<option value="OK">OK</option>
																	<option value="NOK">NOK</option>
																</select>
															) : (
																p.Pagamento ? p.Pagamento.Status : <span className="text-gray-400">-</span>
															)}
														</td>
														<td className="py-2 px-3">
															{editId === (p.Pagamento?.Id_Pagamentos || -p.Id_Agendamento) ? (
																<select
																	className="border rounded px-2 py-1"
																	value={editFields.Modalidade ?? ''}
																	onChange={e => setEditFields(f => ({ ...f, Modalidade: e.target.value }))}
																>
																	<option value="">Selecione</option>
																	<option value="Online">Online</option>
																	<option value="Presencial">Presencial</option>
																</select>
															) : (
																p.Pagamento ? p.Pagamento.Modalidade : <span className="text-gray-400">-</span>
															)}
														</td>
														<td className="py-2 px-3">
															{editId === (p.Pagamento?.Id_Pagamentos || -p.Id_Agendamento) ? (
																<input
																	type="number"
																	className="border rounded px-2 py-1 w-20"
																	value={editFields.Fatura ?? ''}
																	onChange={e => setEditFields(f => ({ ...f, Fatura: Number(e.target.value) }))}
																/>
															) : (
																p.Pagamento && p.Pagamento.Fatura !== null ? p.Pagamento.Fatura : <span className="text-gray-400">-</span>
															)}
														</td>
														<td className="py-2 px-3">
															{editId === (p.Pagamento?.Id_Pagamentos || -p.Id_Agendamento) ? (
																<div className="flex gap-2">
																	<Button variant="primary" onClick={() => handleSave(p.Pagamento?.Id_Pagamentos || -1, p.Id_Agendamento)}>
																		Salvar
																	</Button>
																	<Button variant="secondary" onClick={handleCancel}>
																		Cancelar
																	</Button>
																</div>
															) : (
																<Button variant="secondary" onClick={() => handleEdit(p)}>
																	{p.Pagamento ? 'Editar' : 'Adicionar'}
																</Button>
															)}
														</td>
													</tr>
												))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { endOfMonth } from "date-fns";

function toHHMM(val: any): string | null {
  if (val == null) return null;
  // Prisma/MySQL TIME may come as string '08:45:00' or JS Date — normalizar
  if (typeof val === "string") {
    return val.slice(0,5);
  }
  if (val instanceof Date) {
    return val.toTimeString().slice(0,5);
  }
  return null;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idServico = Number(params.id);
    if (!idServico) return NextResponse.json({ disponibilidade: [] });

    const url = new URL(req.url);
    const funcionarioId = url.searchParams.get("funcionarioId");
    const month = url.searchParams.get("month") || (() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    })();

    // Filtra pela coluna Mes igual ao month — caso deseje ampliar, remova este filtro
    const where: any = { Id_Servico: idServico, Ativo: true };
    if (funcionarioId) where.Id_Funcionario = Number(funcionarioId);
    if (month) where.Mes = month;

    const rows = await prisma.disponibilidadeprod.findMany({ where });

    // Expande cada row (que tem Mes e horários) para entradas diárias dentro do mês
    const out: any[] = [];
    for (const r of rows) {
      const mes = r.Mes ?? month;
      if (!mes || !/^\d{4}-\d{2}$/.test(mes)) continue;
      const [y, m] = mes.split("-").map(Number);
      const start = new Date(y, m - 1, 1);
      const em = endOfMonth(start);

      const inicioT = toHHMM(r.Inicio);
      const almIniT = toHHMM(r.AlmocoInicio);
      const almFimT = toHHMM(r.AlmocoFim);
      const fimT = toHHMM(r.Fim);

      for (let d = new Date(start); d <= em; d.setDate(d.getDate() + 1)) {
        const Data = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

        // criar janelas: se existir almoço, split; senão apenas uma janela
        if (almIniT && almFimT && inicioT) {
          // janela antes do almoço
          if (toHHMM(r.Inicio) && almIniT !== toHHMM(r.Inicio)) {
            out.push({
              Id_Disponibilidade: r.Id_Disponibilidade,
              Data,
              HoraInicio: inicioT,
              HoraFinal: almIniT,
              Id_Servico: r.Id_Servico,
              Id_Funcionario: r.Id_Funcionario,
              Duracao: r.Duracao,
              Tolerancia: r.Tolerancia,
              Ativo: r.Ativo,
            });
          }
          // janela depois do almoço
          if (almFimT && fimT && almFimT !== fimT) {
            out.push({
              Id_Disponibilidade: r.Id_Disponibilidade,
              Data,
              HoraInicio: almFimT,
              HoraFinal: fimT,
              Id_Servico: r.Id_Servico,
              Id_Funcionario: r.Id_Funcionario,
              Duracao: r.Duracao,
              Tolerancia: r.Tolerancia,
              Ativo: r.Ativo,
            });
          }
        } else if (inicioT && fimT) {
          out.push({
            Id_Disponibilidade: r.Id_Disponibilidade,
            Data,
            HoraInicio: inicioT,
            HoraFinal: fimT,
            Id_Servico: r.Id_Servico,
            Id_Funcionario: r.Id_Funcionario,
            Duracao: r.Duracao,
            Tolerancia: r.Tolerancia,
            Ativo: r.Ativo,
          });
        }
      }
    }

    return NextResponse.json({ disponibilidade: out });
  } catch (err) {
    console.error("GET /api/interna/servicos/[id]/disponibilidade error:", err);
    return NextResponse.json({ disponibilidade: [] }, { status: 500 });
  }
}
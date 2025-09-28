'use client';

import { useEffect, useState } from "react";
import Sidebar from "@/components/sideBar";
import Button from "@/components/ui/button";
import { toast } from "react-toastify";

interface Imagem {
  Id_Imagem: number;
  CaminhoImagem: string;
  AltText?: string | null;
}

interface Produto {
  Id_Produto: number;
  Nome?: string | null;
  Estoque?: number | null;
  EstoqueCritico?: number | null;
  disponibilidadeprod?: any[]; // ajuste conforme necessário
  imagens: Imagem[];
  servicos?: any[]; // ajuste conforme necessário
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editProduto, setEditProduto] = useState<Produto | null>(null);

  // Form states
  const [nome, setNome] = useState<string>("");
  const [estoque, setEstoque] = useState<number | "">("");
  const [estoqueCritico, setEstoqueCritico] = useState<number | "">("");
  const [imagens, setImagens] = useState<File[]>([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    setLoading(true);
    const res = await fetch("/api/interna/produtos");
    const data = await res.json();
    setProdutos(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setNome("");
    setEstoque("");
    setEstoqueCritico("");
    setImagens([]);
    setEditProduto(null);
  };

  const handleOpenForm = (produto?: Produto) => {
    if (produto) {
      setEditProduto(produto);
      setNome(produto.Nome || "");
      setEstoque(produto.Estoque ?? "");
      setEstoqueCritico(produto.EstoqueCritico ?? "");
      setImagens([]);
    } else {
      resetForm();
    }
    setOpenForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let produtoId = editProduto?.Id_Produto;

    // Criação ou edição do produto
    const res = await fetch(
      editProduto
        ? `/api/interna/produtos/${produtoId}`
        : "/api/interna/produtos",
      {
        method: editProduto ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editProduto?.Id_Produto,
          nome,
          estoque: estoque === "" ? null : Number(estoque),
          estoqueCritico: estoqueCritico === "" ? null : Number(estoqueCritico),
        }),
      }
    );

    if (!res.ok) {
      toast.error("Erro ao salvar produto.");
      return;
    }

    const produtoSalvo = await res.json();

    // Upload de imagens (se houver)
    if (imagens.length > 0) {
      const formData = new FormData();
      imagens.forEach((img) => formData.append("imagens", img));
      await fetch(`/api/interna/produtos/${produtoSalvo.Id_Produto}/imagens`, {
        method: "POST",
        body: formData,
      });
    }

    toast.success(editProduto ? "Produto atualizado!" : "Produto criado!");
    setOpenForm(false);
    resetForm();
    fetchProdutos();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    const res = await fetch(`/api/interna/produtos/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Produto excluído!");
      setProdutos((prev) => prev.filter((p) => p.Id_Produto !== id));
    } else {
      toast.error("Erro ao excluir produto.");
    }
  };

  const handleDeleteImagem = async (idImagem: number, idProduto: number) => {
    if (!confirm("Excluir esta imagem?")) return;
    const res = await fetch(`/api/interna/imagens/${idImagem}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Imagem excluída!");
      setProdutos((prev) =>
        prev.map((p) =>
          p.Id_Produto === idProduto
            ? { ...p, imagens: p.imagens.filter((img) => img.Id_Imagem !== idImagem) }
            : p
        )
      );
    } else {
      toast.error("Erro ao excluir imagem.");
    }
  };

  // Produtos com estoque crítico
  const produtosCriticos = produtos.filter(
    (p) =>
      typeof p.Estoque === "number" &&
      typeof p.EstoqueCritico === "number" &&
      p.Estoque <= p.EstoqueCritico
  );

  // Produtos normais
  const produtosNormais = produtos.filter(
    (p) =>
      !(
        typeof p.Estoque === "number" &&
        typeof p.EstoqueCritico === "number" &&
        p.Estoque <= p.EstoqueCritico
      )
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
            <Button variant="primary" onClick={() => handleOpenForm()}>
              Novo Produto
            </Button>
          </div>

          {/* Área de produtos com estoque crítico */}
          {produtosCriticos.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-red-700 mb-2">
                Produtos com Estoque Crítico
              </h2>
              <div className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-red-400">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-red-100 text-left">
                      <th className="p-3">Nome</th>
                      <th className="p-3">Estoque</th>
                      <th className="p-3">Estoque Crítico</th>
                      <th className="p-3">Imagens</th>
                      <th className="p-3 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosCriticos.map((produto) => (
                      <tr
                        key={produto.Id_Produto}
                        className="border-t bg-red-50 text-red-700 font-semibold"
                      >
                        <td className="p-3">{produto.Nome}</td>
                        <td className="p-3">{produto.Estoque ?? "--"}</td>
                        <td className="p-3">{produto.EstoqueCritico ?? "--"}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-2">
                            {produto.imagens.map((img) => (
                              <div key={img.Id_Imagem} className="relative group">
                                <img
                                  src={img.CaminhoImagem}
                                  alt={img.AltText || "Imagem"}
                                  className="w-12 h-12 object-cover rounded border"
                                />
                                <button
                                  onClick={() => handleDeleteImagem(img.Id_Imagem, produto.Id_Produto)}
                                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                  title="Excluir imagem"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 flex gap-3 justify-center">
                          <button
                            onClick={() => handleOpenForm(produto)}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(produto.Id_Produto)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Área de produtos normais */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {loading ? (
              <p className="p-4 text-gray-600">Carregando...</p>
            ) : produtosNormais.length === 0 ? (
              <p className="p-4 text-gray-600">Nenhum produto cadastrado.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-3">Nome</th>
                    <th className="p-3">Estoque</th>
                    <th className="p-3">Estoque Crítico</th>
                    <th className="p-3">Imagens</th>
                    <th className="p-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtosNormais.map((produto) => (
                    <tr key={produto.Id_Produto} className="border-t hover:bg-gray-50">
                      <td className="p-3">{produto.Nome}</td>
                      <td className="p-3">{produto.Estoque ?? "--"}</td>
                      <td className="p-3">{produto.EstoqueCritico ?? "--"}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          {produto.imagens.map((img) => (
                            <div key={img.Id_Imagem} className="relative group">
                              <img
                                src={img.CaminhoImagem}
                                alt={img.AltText || "Imagem"}
                                className="w-12 h-12 object-cover rounded border"
                              />
                              <button
                                onClick={() => handleDeleteImagem(img.Id_Imagem, produto.Id_Produto)}
                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                                title="Excluir imagem"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 flex gap-3 justify-center">
                        <button
                          onClick={() => handleOpenForm(produto)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(produto.Id_Produto)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {/* Modal do formulário */}
        {openForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                onClick={() => setOpenForm(false)}
                aria-label="Fechar"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">
                {editProduto ? "Editar Produto" : "Novo Produto"}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estoque</label>
                  <input
                    type="number"
                    value={estoque}
                    onChange={(e) => setEstoque(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full border rounded p-2"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estoque Crítico</label>
                  <input
                    type="number"
                    value={estoqueCritico}
                    onChange={(e) => setEstoqueCritico(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full border rounded p-2"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Imagens</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImagens(Array.from(e.target.files || []))}
                    className="w-full"
                  />
                  {imagens.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {imagens.map((img, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={URL.createObjectURL(img)}
                            alt={img.name}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {editProduto && editProduto.imagens.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {editProduto.imagens.map((img) => (
                        <img
                          key={img.Id_Imagem}
                          src={img.CaminhoImagem}
                          alt={img.AltText || "Imagem"}
                          className="w-12 h-12 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setOpenForm(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
          <p>Powered by Beatriz Fonseca | {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
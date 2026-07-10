"use client"; // Avisa o Next.js que este é um componente interativo (Cliente)

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewDepartmentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue
    setIsLoading(true);

    // Inserindo os dados no Supabase
    const { error } = await supabase
      .from("departments")
      .insert([{ name, description }]);

    setIsLoading(false);

    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      setIsOpen(false); // Fecha o modal
      setName(""); // Limpa o formulário
      setDescription("");
      router.refresh(); // Atualiza a página para mostrar o novo departamento
    }
  };

  return (
    <>
      {/* O Botão Azul */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
      >
        + Novo Departamento
      </button>

      {/* O Modal (Janela Flutuante) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Novo Departamento
            </h2>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Nome do Setor
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ex: Recursos Humanos"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="O que esta equipe faz?"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 mt-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

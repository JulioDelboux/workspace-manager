import { supabase } from "../lib/supabase";

export default async function Home() {
  const { data: departments, error } = await supabase
    .from("departments")
    .select("*");

  if (error) {
    return <div>Erro ao buscar dados: {error.message}</div>;
  }

  return (
    <main className="p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        Workspace Manager - Teste de Conexão
      </h1>

      <h2 className="text-xl mb-4">Departamentos Cadastrados:</h2>

      <div className="grid gap-4 max-w-md">
        {departments?.map((dept) => (
          <div
            key={dept.id}
            className="p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-md"
          >
            <h3 className="font-bold text-lg text-white">{dept.name}</h3>
            <p className="text-gray-400 text-sm">{dept.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

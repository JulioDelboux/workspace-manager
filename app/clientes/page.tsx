import { supabase } from '../../lib/supabase'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Clientes() {
  // Puxando os clientes e fazendo JOIN para pegar o nome do Membro responsável
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*, members(name)')
    .order('created_at', { ascending: false })

  if (error) return <div>Erro ao buscar clientes: {error.message}</div>

  return (
    <div className="flex h-screen bg-gray-950 text-white font-sans">

      {/* Menu Lateral atualizado com a aba Clientes */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
        <h2 className="text-2xl font-black text-blue-500 mb-10 tracking-tight">Workspace.</h2>
        <nav className="space-y-2 flex-1">
          <Link href="/" className="block p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            Departamentos
          </Link>
          <Link href="/membros" className="block p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            Membros
          </Link>
          <Link href="/clientes" className="block p-3 rounded-lg bg-blue-600/10 text-blue-400 font-semibold border border-blue-500/20">
            Clientes
          </Link>
          <a href="#" className="block p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            Agendamentos
          </a>
        </nav>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 border-b border-gray-800 flex items-center justify-between px-10 bg-gray-900/50 backdrop-blur-sm">
          <h1 className="text-xl font-medium text-gray-200">Gestão de Clientes</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Admin</span>
            <UserButton afterSignOutUrl="/"/>
          </div>
        </header>

        <div className="p-10 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-white">Carteira de Clientes</h2>
            {/* Em breve trocaremos este botão pelo Modal */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">
              + Novo Cliente
            </button>
          </div>

          {/* Tabela de Clientes */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950/50 border-b border-gray-800 text-sm text-gray-400">
                  <th className="p-4 font-medium">Cliente / Empresa</th>
                  <th className="p-4 font-medium">Contato</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Último Contato</th>
                  <th className="p-4 font-medium">Responsável (Vendedor)</th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((client) => (
                  <tr key={client.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="p-4 font-medium text-white">
                      {client.name} <br/>
                      <span className="text-xs text-gray-500 font-normal">{client.company}</span>
                    </td>
                    <td className="p-4 text-gray-400">{client.email}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(client.last_contact).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4 text-gray-300">
                      {client.members ? client.members.name : 'Não atribuído'}
                    </td>
                  </tr>
                ))}
                {clients?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">Nenhum cliente cadastrado. A carteira está vazia.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  )
}

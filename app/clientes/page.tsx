import { supabase } from '../../lib/supabase'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import NewClientModal from '../../components/NewClientModal'
import Sidebar from '../../components/Sidebar'

export default async function Clientes() {
  // Puxando os clientes e fazendo JOIN para pegar o nome do Membro responsável
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*, members(name)')
    .order('created_at', { ascending: false })

  if (error) return <div>Erro ao buscar clientes: {error.message}</div>

  // Puxando os membros para popular a lista de vendedores
  const { data: members } = await supabase.from('members').select('id, name')

  return (
    <div className="flex h-screen bg-gray-950 text-white font-sans">

      {/* Menu Lateral atualizado com a aba Clientes */}
      <Sidebar />

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
            <NewClientModal members={members || []} />
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

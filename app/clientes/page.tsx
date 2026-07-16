import { supabase } from '../../lib/supabase'
import Sidebar from '../../components/Sidebar'
import NewClientModal from '../../components/NewClientModal'
import ClientList from '../../components/ClientList'

export default async function Clientes() {
  const { data: clients } = await supabase.from('clients').select('*, members(name)')
  const { data: members } = await supabase.from('members').select('id, name')

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-semibold">Carteira de Clientes</h2>
          <NewClientModal members={members || []} />
        </div>

        {/* Passamos os dados buscados no servidor para o componente cliente */}
        <ClientList initialClients={clients || []} />
      </main>
    </div>
  )
}

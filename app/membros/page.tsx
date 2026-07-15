import { supabase } from '../../lib/supabase'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import NewMemberModal from '../../components/NewMemberModal'
import Sidebar from '../../components/Sidebar'

export default async function Membros() {
  // Puxando os membros e fazendo um JOIN com a tabela de departamentos
  const { data: members, error } = await supabase
    .from('members')
    .select('*, departments(name)')
    .order('created_at', { ascending: false })

  // Puxando os departamentos para passar para o Modal
  const { data: departments } = await supabase.from('departments').select('id, name')

  if (error) return <div>Erro ao buscar dados: {error.message}</div>

  return (
    <div className="flex h-screen bg-gray-950 text-white font-sans">

      {/* Menu Lateral */}
      <Sidebar />

      {/* Área Principal */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 border-b border-gray-800 flex items-center justify-between px-10 bg-gray-900/50 backdrop-blur-sm">
          <h1 className="text-xl font-medium text-gray-200">Gestão de Equipe</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Admin</span>
            <UserButton afterSignOutUrl="/"/>
          </div>
        </header>

        <div className="p-10 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-white">Membros Cadastrados</h2>
            <NewMemberModal departments={departments || []} />
          </div>

          {/* Tabela de Membros */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950/50 border-b border-gray-800 text-sm text-gray-400">
                  <th className="p-4 font-medium">Nome</th>
                  <th className="p-4 font-medium">E-mail</th>
                  <th className="p-4 font-medium">Departamento</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {members?.map((member) => (
                  <tr key={member.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="p-4 font-medium text-white">{member.name}</td>
                    <td className="p-4 text-gray-400">{member.email}</td>
                    {/* Acessando o dado do JOIN que fizemos no banco */}
                    <td className="p-4 text-gray-300">
                      {member.departments ? member.departments.name : 'Sem setor'}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {members?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">Nenhum membro encontrado.</td>
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

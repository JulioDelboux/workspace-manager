import { supabase } from '../lib/supabase'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import NewDepartmentModal from '../components/NewDepartmentModal'
import Sidebar from '../components/Sidebar'
import DepartmentChart from '../components/DepartmentChart'

export default async function Home() {
  // Puxando os departamentos e contando quantos membros tem em cada um
  const { data: departments, error } = await supabase
    .from('departments')
    .select('*, members(count)')
    .order('created_at', { ascending: true })

  // Puxando todos os membros apenas para contar o total geral
  const { count: totalMembers } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })

  if (error) {
    return <div>Erro ao buscar dados: {error.message}</div>
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white font-sans">

      {/* Menu Lateral */}
      <Sidebar />

      {/* Área Principal */}
      <main className="flex-1 flex flex-col">

        {/* Cabeçalho */}
        <header className="h-20 border-b border-gray-800 flex items-center justify-between px-10 bg-gray-900/50 backdrop-blur-sm">
          <h1 className="text-xl font-medium text-gray-200">Visão Geral</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Admin</span>
            <UserButton afterSignOutUrl="/"/>
          </div>
        </header>

        {/* Conteúdo do Dashboard */}
        <div className="p-10 overflow-auto">

          {/* Cartões de Métricas (KPIs) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-md">
              <p className="text-gray-400 text-sm font-medium mb-1">Total de Departamentos</p>
              <h3 className="text-3xl font-bold text-white">{departments?.length || 0}</h3>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-md">
              <p className="text-gray-400 text-sm font-medium mb-1">Total de Membros</p>
              <h3 className="text-3xl font-bold text-blue-400">{totalMembers || 0}</h3>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-md">
              <p className="text-gray-400 text-sm font-medium mb-1">Status do Sistema</p>
              <h3 className="text-xl font-bold text-green-400 flex items-center gap-2 mt-1">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </h3>
            </div>
            <div className="mb-10">
              <DepartmentChart data={departments || []} />
            </div>
          </div>



          <DepartmentChart data={departments} />
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Departamentos Cadastrados</h2>
            <NewDepartmentModal />
          </div>

          {/* Grid de Departamentos com contagem de membros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments?.map((dept) => (
              <div key={dept.id} className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-xl hover:border-blue-500/50 transition-all group flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {dept.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipe
                  </span>
                  <span className="bg-gray-800 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-gray-700">
                    {dept.members[0]?.count || 0} membro(s)
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}

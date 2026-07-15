"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Briefcase, Calendar } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  // Função que verifica se a rota atual é a mesma do link
  const navItemClass = (path: string) => {
    const isActive = pathname === path
    return `flex items-center gap-3 p-3 rounded-lg transition-all ${
      isActive
        ? 'bg-blue-600/10 text-blue-400 font-semibold border border-blue-500/20'
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`
  }

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
      <h2 className="text-2xl font-black text-blue-500 mb-10 tracking-tight">
        Workspace.
      </h2>

      <nav className="space-y-2 flex-1">
        <Link href="/" className={navItemClass('/')}>
          <LayoutDashboard size={20} />
          Visão Geral
        </Link>

        <Link href="/membros" className={navItemClass('/membros')}>
          <Users size={20} />
          Membros
        </Link>

        <Link href="/clientes" className={navItemClass('/clientes')}>
          <Briefcase size={20} />
          Clientes
        </Link>

        <a href="#" className={navItemClass('/agendamentos')}>
          <Calendar size={20} />
          Agendamentos
        </a>
      </nav>
    </aside>
  )
}

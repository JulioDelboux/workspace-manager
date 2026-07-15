"use client"

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

// Definindo o tipo de dado que vamos receber do banco
type Member = { id: string, name: string }

export default function NewClientModal({ members }: { members: Member[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [memberId, setMemberId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Prepara os dados. Se não escolher nenhum membro, envia null para o banco não dar erro de UUID inválido
    const payload = {
      name,
      company,
      email,
      member_id: memberId || null
    }

    const { error } = await supabase.from('clients').insert([payload])

    setIsLoading(false)

    if (error) {
      alert('Erro ao salvar: ' + error.message)
    } else {
      setIsOpen(false)
      setName('')
      setCompany('')
      setEmail('')
      setMemberId('')
      router.refresh()
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
      >
        + Novo Cliente
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Cadastrar Cliente</h2>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nome do Contato</label>
                <input
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Ex: Carlos Mendes"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Empresa</label>
                <input
                  type="text" required value={company} onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Ex: Acme Corp"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">E-mail corporativo</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="carlos@acme.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Vendedor Responsável (Opcional)</label>
                <select
                  value={memberId} onChange={(e) => setMemberId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="">Deixar sem responsável por enquanto...</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-4 justify-end">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50">
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

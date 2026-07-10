"use client"

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

type Department = { id: string, name: string }

export default function NewMemberModal({ departments }: { departments: Department[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase
      .from('members')
      .insert([{ name, email, department_id: departmentId }])

    setIsLoading(false)

    if (error) {
      alert('Erro ao salvar: ' + error.message)
    } else {
      setIsOpen(false)
      setName('')
      setEmail('')
      setDepartmentId('')
      router.refresh()
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
      >
        + Novo Membro
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Cadastrar Membro</h2>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nome Completo</label>
                <input
                  type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Ex: João da Silva"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">E-mail</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="joao@empresa.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Departamento</label>
                <select
                  required value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="" disabled>Selecione um setor...</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
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

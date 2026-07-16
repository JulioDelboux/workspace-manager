"use client"

import { useState } from 'react'

export default function ClientList({ initialClients }: { initialClients: any[] }) {
  const [filter, setFilter] = useState('Todos')

  const filteredClients = initialClients.filter(c =>
    filter === 'Todos' ? true : c.status === filter
  )

  return (
    <>
      <div className="mb-6 flex gap-2">
        {['Todos', 'Novo Lead', 'Em Negociação', 'Fechado'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === status ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          {/* ... (o seu código da tabela aqui) ... */}
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                <td className="p-4 text-white">{client.name}</td>
                <td className="p-4 text-gray-400">{client.email}</td>
                <td className="p-4"><span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs">{client.status}</span></td>
                <td className="p-4 text-gray-400">{new Date(client.last_contact).toLocaleDateString('pt-BR')}</td>
                <td className="p-4 text-gray-300">{client.members?.name || 'Não atribuído'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

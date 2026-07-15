"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function DepartmentChart({ data }: { data: any[] }) {
  // Transforma os dados do Supabase para o formato que o gráfico entende
  const chartData = data.map(dept => ({
    name: dept.name,
    membros: dept.members[0]?.count || 0
  }))

  return (
    <div className="h-64 w-full bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl">
      <h3 className="text-gray-400 text-sm font-medium mb-6">Distribuição de Membros por Setor</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
            cursor={{ fill: 'transparent' }}
          />
          <Bar dataKey="membros" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#3b82f6" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jul",
    total: 145,
  },
  {
    name: "Ago",
    total: 189,
  },
  {
    name: "Sep",
    total: 234,
  },
  {
    name: "Oct",
    total: 198,
  },
  {
    name: "Nov",
    total: 267,
  },
  {
    name: "Dic",
    total: 312,
  },
]

export function ShipmentChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

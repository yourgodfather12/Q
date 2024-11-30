"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", members: 400 },
  { name: "Feb", members: 600 },
  { name: "Mar", members: 800 },
  { name: "Apr", members: 1000 },
  { name: "May", members: 1400 },
  { name: "Jun", members: 1800 },
  { name: "Jul", members: 2400 },
]

export function ServerGrowth() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="members" stroke="#adfa1d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}


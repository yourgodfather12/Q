"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Gaming Community", commands: 4000 },
  { name: "Anime Fans", commands: 3000 },
  { name: "Music Lovers", commands: 2000 },
  { name: "Developers Hub", commands: 2780 },
  { name: "Meme Central", commands: 1890 },
  { name: "Book Club", commands: 2390 },
  { name: "Fitness Freaks", commands: 3490 },
]

export function TopServers() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={150} />
        <Bar dataKey="commands" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}


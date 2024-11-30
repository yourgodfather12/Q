"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function RecentCommands() {
  const [commands] = useState([
    { name: "!help", uses: 1234 },
    { name: "!play", uses: 987 },
    { name: "!stats", uses: 756 },
    { name: "!ban", uses: 543 },
    { name: "!mute", uses: 321 },
  ])

  return (
    <div className="space-y-8">
      {commands.map((command) => (
        <div key={command.name} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{command.name}</p>
            <p className="text-sm text-muted-foreground">
              {command.uses} uses
            </p>
          </div>
          <div className="ml-auto font-medium">
            <Button variant="ghost" size="sm">View Details</Button>
          </div>
        </div>
      ))}
    </div>
  )
}


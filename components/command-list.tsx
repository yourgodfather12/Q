"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Zap, Edit, Trash2 } from 'lucide-react'

interface Command {
  id: string
  name: string
  description: string
  response: string
  usage: number
}

export function CommandList() {
  const [commands, setCommands] = useState<Command[]>([
    {
      id: "1",
      name: "!help",
      description: "Display available commands",
      response: "Here are the available commands: ...",
      usage: 1234,
    },
    {
      id: "2",
      name: "!weather",
      description: "Get current weather",
      response: "The current weather is...",
      usage: 567,
    },
    {
      id: "3",
      name: "!joke",
      description: "Tell a random joke",
      response: "Why did the chicken cross the road?...",
      usage: 890,
    },
  ])
  const [newCommand, setNewCommand] = useState<Partial<Command>>({})

  const addCommand = () => {
    if (newCommand.name && newCommand.description && newCommand.response) {
      setCommands([...commands, { ...newCommand, id: Date.now().toString(), usage: 0 } as Command])
      setNewCommand({})
    }
  }

  const deleteCommand = (id: string) => {
    setCommands(commands.filter(command => command.id !== id))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Command</CardTitle>
          <CardDescription>Create a new custom command for your bot</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Command Name</Label>
            <Input
              id="name"
              placeholder="!command"
              value={newCommand.name || ''}
              onChange={(e) => setNewCommand({ ...newCommand, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What does this command do?"
              value={newCommand.description || ''}
              onChange={(e) => setNewCommand({ ...newCommand, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="response">Response</Label>
            <Textarea
              id="response"
              placeholder="The bot's response when this command is used"
              value={newCommand.response || ''}
              onChange={(e) => setNewCommand({ ...newCommand, response: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={addCommand}>Add Command</Button>
        </CardFooter>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {commands.map((command) => (
          <Card key={command.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{command.name}</span>
                <Badge variant="secondary" className="ml-2">
                  <Zap className="h-3 w-3 mr-1" />
                  {command.usage}
                </Badge>
              </CardTitle>
              <CardDescription>{command.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{command.response}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit command</span>
              </Button>
              <Button variant="destructive" size="icon" onClick={() => deleteCommand(command.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete command</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


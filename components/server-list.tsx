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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, MessageSquare, Music, Shield } from 'lucide-react'

interface Server {
  id: string
  name: string
  memberCount: number
  icon: string
  features: string[]
  activityLevel: number
}

export function ServerList() {
  const [servers] = useState<Server[]>([
    {
      id: "1",
      name: "Gaming Community",
      memberCount: 5000,
      icon: "/placeholder.svg?height=40&width=40",
      features: ["Music", "Moderation"],
      activityLevel: 80,
    },
    {
      id: "2",
      name: "Developers Hub",
      memberCount: 2000,
      icon: "/placeholder.svg?height=40&width=40",
      features: ["Code Help", "Project Collaboration"],
      activityLevel: 65,
    },
    {
      id: "3",
      name: "Anime Fans",
      memberCount: 8000,
      icon: "/placeholder.svg?height=40&width=40",
      features: ["Anime Discussions", "Watch Parties"],
      activityLevel: 90,
    },
  ])

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "Music":
        return <Music className="h-4 w-4" />
      case "Moderation":
        return <Shield className="h-4 w-4" />
      case "Code Help":
      case "Project Collaboration":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {servers.map((server) => (
        <Card key={server.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={server.icon} alt={server.name} />
                <AvatarFallback>{server.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{server.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {server.memberCount} members
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {server.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                    {getFeatureIcon(feature)}
                    {feature}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Activity Level</span>
                  <span className="font-medium">{server.activityLevel}%</span>
                </div>
                <Progress value={server.activityLevel} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Manage Server</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


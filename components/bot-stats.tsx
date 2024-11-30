import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Server, MessageSquare, Activity } from 'lucide-react'

export function BotStats() {
  const stats = [
    {
      name: "Total Users",
      value: "10,245",
      icon: Users,
      description: "7% increase from last week",
    },
    {
      name: "Total Servers",
      value: "354",
      icon: Server,
      description: "2 new servers this week",
    },
    {
      name: "Commands Used",
      value: "43,123",
      icon: MessageSquare,
      description: "20% increase from last month",
    },
    {
      name: "Uptime",
      value: "99.9%",
      icon: Activity,
      description: "Over the last 30 days",
    },
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.name}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}


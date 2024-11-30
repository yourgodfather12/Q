import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  // In a real application, you would fetch this data from your API
  const activities = [
    { id: 1, type: "Command Used", details: "!help command used in Server XYZ", time: "2 minutes ago" },
    { id: 2, type: "New Member", details: "User ABC joined Server XYZ", time: "5 minutes ago" },
    { id: 3, type: "Bot Added", details: "Bot added to Server ABC", time: "10 minutes ago" },
    { id: 4, type: "Command Created", details: "New command !welcome created", time: "1 hour ago" },
  ]

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest events from your Discord bot</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start space-x-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.type}</p>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
              </div>
              <div className="text-sm text-muted-foreground">{activity.time}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


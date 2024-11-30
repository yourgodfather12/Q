import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from '@/components/overview'
import { RecentCommands } from '@/components/recent-commands'
import { ServerGrowth } from '@/components/server-growth'
import { CommandUsageChart } from '@/components/command-usage-chart'
import { TopServers } from '@/components/top-servers'

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics"
        text="Detailed statistics and usage data for your bot"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Command Usage Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Commands</CardTitle>
            <CardDescription>Your most used commands in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentCommands />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Server Growth</CardTitle>
            <CardDescription>New members joined over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ServerGrowth />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Command Usage Distribution</CardTitle>
            <CardDescription>Percentage of total commands used</CardDescription>
          </CardHeader>
          <CardContent>
            <CommandUsageChart />
          </CardContent>
        </Card>
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Top Servers</CardTitle>
            <CardDescription>Servers with the most bot activity</CardDescription>
          </CardHeader>
          <CardContent>
            <TopServers />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}


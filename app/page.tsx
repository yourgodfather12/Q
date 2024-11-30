import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { BotStats } from '@/components/bot-stats'
import { RecentActivity } from '@/components/recent-activity'
import { ServerInvites } from '@/components/server-invites'
import { DatabaseViewer } from '@/components/database-viewer'
import { MediaManager } from '@/components/media-manager'

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Comprehensive control of your Discord bot"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BotStats />
      </div>
      <div className="grid gap-4 mt-4">
        <RecentActivity />
        <ServerInvites />
        <DatabaseViewer />
        <MediaManager />
      </div>
    </DashboardShell>
  )
}


import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { ServerList } from '@/components/server-list'

export default function ServersPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Servers"
        text="Manage the servers your bot is in"
      />
      <ServerList />
    </DashboardShell>
  )
}


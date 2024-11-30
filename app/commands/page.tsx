import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { CommandList } from '@/components/command-list'

export default function CommandsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Commands"
        text="Manage and create custom commands for your bot"
      />
      <CommandList />
    </DashboardShell>
  )
}


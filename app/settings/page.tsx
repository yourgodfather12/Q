import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { BotSettings } from '@/components/bot-settings'

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage your bot's settings and configurations"
      />
      <BotSettings />
    </DashboardShell>
  )
}


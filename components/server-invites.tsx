"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from 'lucide-react'

interface Invite {
  id: string
  code: string
  uses: number
  maxUses: number | null
  expiresAt: string | null
}

export function ServerInvites() {
  const [invites, setInvites] = useState<Invite[]>([
    { id: "1", code: "discord.gg/abc123", uses: 5, maxUses: 10, expiresAt: "2023-12-31T23:59:59Z" },
    { id: "2", code: "discord.gg/def456", uses: 3, maxUses: null, expiresAt: null },
  ])
  const [newInvite, setNewInvite] = useState({ maxUses: "", expiresIn: "" })

  const createInvite = () => {
    // In a real application, you would call your API to create a new invite
    const invite: Invite = {
      id: Date.now().toString(),
      code: `discord.gg/${Math.random().toString(36).substring(7)}`,
      uses: 0,
      maxUses: newInvite.maxUses ? parseInt(newInvite.maxUses) : null,
      expiresAt: newInvite.expiresIn ? new Date(Date.now() + parseInt(newInvite.expiresIn) * 60000).toISOString() : null,
    }
    setInvites([...invites, invite])
    setNewInvite({ maxUses: "", expiresIn: "" })
  }

  const deleteInvite = (id: string) => {
    // In a real application, you would call your API to delete the invite
    setInvites(invites.filter(invite => invite.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Invites</CardTitle>
        <CardDescription>Manage invitations to your Discord server</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invite Link</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead>Max Uses</TableHead>
              <TableHead>Expires At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell>{invite.code}</TableCell>
                <TableCell>{invite.uses}</TableCell>
                <TableCell>{invite.maxUses || "Unlimited"}</TableCell>
                <TableCell>{invite.expiresAt ? new Date(invite.expiresAt).toLocaleString() : "Never"}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => deleteInvite(invite.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <div>
            <Label htmlFor="maxUses">Max Uses</Label>
            <Input
              id="maxUses"
              placeholder="Unlimited"
              value={newInvite.maxUses}
              onChange={(e) => setNewInvite({ ...newInvite, maxUses: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="expiresIn">Expires In (minutes)</Label>
            <Input
              id="expiresIn"
              placeholder="Never"
              value={newInvite.expiresIn}
              onChange={(e) => setNewInvite({ ...newInvite, expiresIn: e.target.value })}
            />
          </div>
          <Button onClick={createInvite} className="mt-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Invite
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}


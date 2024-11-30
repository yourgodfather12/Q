"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DatabaseEntry {
  id: string
  type: string
  key: string
  value: string
}

export function DatabaseViewer() {
  const [entries, setEntries] = useState<DatabaseEntry[]>([
    { id: "1", type: "user", key: "user:123", value: '{"name": "John Doe", "level": 5}' },
    { id: "2", type: "server", key: "server:456", value: '{"name": "Cool Server", "members": 100}' },
    { id: "3", type: "settings", key: "settings:global", value: '{"welcomeMessage": true, "logChannel": "789"}' },
  ])
  const [newEntry, setNewEntry] = useState<Partial<DatabaseEntry>>({ type: "user" })

  const addEntry = () => {
    if (newEntry.key && newEntry.value) {
      setEntries([...entries, { ...newEntry, id: Date.now().toString() } as DatabaseEntry])
      setNewEntry({ type: "user" })
    }
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Viewer</CardTitle>
        <CardDescription>View and manage your bot's database entries</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="view">
          <TabsList>
            <TabsTrigger value="view">View Entries</TabsTrigger>
            <TabsTrigger value="add">Add Entry</TabsTrigger>
          </TabsList>
          <TabsContent value="view">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.type}</TableCell>
                    <TableCell>{entry.key}</TableCell>
                    <TableCell className="max-w-xs truncate">{entry.value}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => deleteEntry(entry.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="add">
            <div className="space-y-4">
              <div>
                <Label htmlFor="entryType">Type</Label>
                <select
                  id="entryType"
                  value={newEntry.type}
                  onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="server">Server</option>
                  <option value="settings">Settings</option>
                </select>
              </div>
              <div>
                <Label htmlFor="entryKey">Key</Label>
                <Input
                  id="entryKey"
                  value={newEntry.key || ""}
                  onChange={(e) => setNewEntry({ ...newEntry, key: e.target.value })}
                  placeholder="Enter key"
                />
              </div>
              <div>
                <Label htmlFor="entryValue">Value (JSON)</Label>
                <Input
                  id="entryValue"
                  value={newEntry.value || ""}
                  onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
                  placeholder="Enter JSON value"
                />
              </div>
              <Button onClick={addEntry}>Add Entry</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


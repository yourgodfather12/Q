"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Hash, Activity, FileText, MessageSquare, Bell } from 'lucide-react'

export function BotSettings() {
  const [settings, setSettings] = useState({
    botName: "My Awesome Bot",
    prefix: "!",
    status: "online",
    activityType: "Playing",
    activityName: "with commands",
    description: "A versatile Discord bot for your server",
    logChannel: "",
    enableWelcomeMessage: true,
    welcomeMessage: "Welcome to the server, {user}!",
  })

  const handleChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Here you would typically send the settings to your backend
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-6 w-6" />
            General Settings
          </CardTitle>
          <CardDescription>Configure your bot's basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="botName" className="flex items-center">
              <Bot className="mr-2 h-4 w-4" />
              Bot Name
            </Label>
            <Input
              id="botName"
              value={settings.botName}
              onChange={(e) => handleChange("botName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prefix" className="flex items-center">
              <Hash className="mr-2 h-4 w-4" />
              Command Prefix
            </Label>
            <Input
              id="prefix"
              value={settings.prefix}
              onChange={(e) => handleChange("prefix", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Bot Status
            </Label>
            <Select
              value={settings.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="dnd">Do Not Disturb</SelectItem>
                <SelectItem value="invisible">Invisible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="activityType" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Activity Type
            </Label>
            <Select
              value={settings.activityType}
              onValueChange={(value) => handleChange("activityType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Playing">Playing</SelectItem>
                <SelectItem value="Listening">Listening</SelectItem>
                <SelectItem value="Watching">Watching</SelectItem>
                <SelectItem value="Competing">Competing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="activityName" className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Activity Name
            </Label>
            <Input
              id="activityName"
              value={settings.activityName}
              onChange={(e) => handleChange("activityName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Bot Description
            </Label>
            <Textarea
              id="description"
              value={settings.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-6 w-6" />
            Advanced Settings
          </CardTitle>
          <CardDescription>Configure advanced bot features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logChannel" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Log Channel
            </Label>
            <Input
              id="logChannel"
              value={settings.logChannel}
              onChange={(e) => handleChange("logChannel", e.target.value)}
              placeholder="Enter channel ID"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="enableWelcomeMessage"
              checked={settings.enableWelcomeMessage}
              onCheckedChange={(checked) => handleChange("enableWelcomeMessage", checked)}
            />
            <Label htmlFor="enableWelcomeMessage" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Enable Welcome Message
            </Label>
          </div>
          {settings.enableWelcomeMessage && (
            <div className="space-y-2">
              <Label htmlFor="welcomeMessage" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Welcome Message
              </Label>
              <Textarea
                id="welcomeMessage"
                value={settings.welcomeMessage}
                onChange={(e) => handleChange("welcomeMessage", e.target.value)}
                placeholder="Enter welcome message. Use {user} to mention the new member."
              />
            </div>
          )}
        </CardContent>
      </Card>
      <Button onClick={handleSave} className="w-full">Save Settings</Button>
    </div>
  )
}


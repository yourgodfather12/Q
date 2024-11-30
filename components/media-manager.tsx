"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Trash2, Download } from 'lucide-react'

interface MediaFile {
  id: string
  name: string
  type: "image" | "video"
  url: string
  uploadDate: string
}

export function MediaManager() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    { id: "1", name: "logo.png", type: "image", url: "/placeholder.svg?height=100&width=100", uploadDate: "2023-06-01" },
    { id: "2", name: "intro.mp4", type: "video", url: "/placeholder.svg?height=100&width=100", uploadDate: "2023-06-02" },
  ])

  const deleteFile = (id: string) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Manager</CardTitle>
        <CardDescription>Manage images and videos used by your bot</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="images">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          <TabsContent value="images">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaFiles.filter(file => file.type === "image").map((file) => (
                <div key={file.id} className="relative group">
                  <img src={file.url} alt={file.name} className="w-full h-32 object-cover rounded" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" className="mr-2">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => deleteFile(file.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="videos">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaFiles.filter(file => file.type === "video").map((file) => (
                <div key={file.id} className="relative group">
                  <video src={file.url} className="w-full h-32 object-cover rounded" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" className="mr-2">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => deleteFile(file.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload New File
        </Button>
      </CardFooter>
    </Card>
  )
}


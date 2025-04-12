"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, CheckCircle } from "lucide-react"
import VideoPlayer from "@/components/video-player"

// Mock data for the video program
const videoProgram = [
  {
    id: 1,
    module: "Bienvenida y Preparación",
    videos: [
      {
        id: "v1",
        title: "Bienvenida y cómo funciona el programa",
        duration: "",
        thumbnail: "/images/serenibaby-logo.png",
        description:
          "Este es el primer paso para transformar el sueño de tu bebé. En este video te explicaremos cómo funciona el programa, qué esperar en las próximas semanas y cómo aprovechar al máximo cada herramienta.",
        videoUrl: "/videos/dia_1/primero.mp4",
      },
      {
        id: "v2",
        title: "Cómo prepararte para el proceso",
        duration: "",
        thumbnail: "/images/segundo_vid_cap.png",
        description:
          "Descubre cómo organizarte para que este proceso sea más sencillo. Te explicaremos cómo usar el registro de sueño, entender la edad corregida y mantener la constancia para lograr los resultados que tanto deseas.",
        videoUrl: "/videos/dia_1/segundo.mp4",
      },
    ],
  },
  {
    id: 2,
    module: "Entendiendo el sueño de tu bebé",
    videos: [
      {
        id: "v3",
        title: "Fisiología del sueño infantil",
        duration: "10:50",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Sabías que el sueño de tu bebé es diferente al de los adultos? Aprende sobre sus ciclos de sueño y por qué se despierta tanto.",
        videoUrl: "https://example.com/video3.mp4",
      },
      {
        id: "v4",
        title: "Bases de sueño saludable",
        duration: "2:45",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "Construir buenos hábitos de sueño comienza aquí. Aprende cuáles son los pilares de un descanso reparador y cómo aplicarlos en casa.",
        videoUrl: "https://example.com/video4.mp4",
      },
      {
        id: "v5",
        title: "Señales de sueño",
        duration: "2:30",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "Identificar cuándo tu bebé está listo para dormir puede marcar la diferencia. Descubre las señales para evitar el sobrecansancio.",
        videoUrl: "https://example.com/video5.mp4",
      },
    ],
  },
  {
    id: 3,
    module: "Puzzle del sueño",
    videos: [
      {
        id: "v6",
        title: "El puzzle del sueño",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      },
      {
        id: "v7",
        title: "Asociaciones de sueño",
        duration: "12:25",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "Descubre cómo las formas en que tu bebé se duerme influyen en su capacidad para dormir toda la noche.",
        videoUrl: "https://example.com/video7.mp4",
      },
    ],
  },
]

// Helper functions for user progress
const USER_PROGRESS_KEY = "sweetdreams_video_progress"

const getUserProgress = (userId: string) => {
  const progress = localStorage.getItem(`${USER_PROGRESS_KEY}_${userId}`)
  return progress ? JSON.parse(progress) : { completedVideos: [], lastWatched: null }
}

const saveUserProgress = (userId: string, progress: { completedVideos: string[]; lastWatched: string | null }) => {
  localStorage.setItem(`${USER_PROGRESS_KEY}_${userId}`, JSON.stringify(progress))
}

const markVideoAsCompleted = (userId: string, videoId: string) => {
  const progress = getUserProgress(userId)
  if (!progress.completedVideos.includes(videoId)) {
    progress.completedVideos.push(videoId)
    progress.lastWatched = videoId
    saveUserProgress(userId, progress)
  }
}

export default function VideosPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("1")
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [userProgress, setUserProgress] = useState<{ completedVideos: string[]; lastWatched: string | null }>({
    completedVideos: [],
    lastWatched: null,
  })

  // Calculate total videos and completed videos
  const totalVideos = videoProgram.reduce((acc, module) => acc + module.videos.length, 0)

  useEffect(() => {
    if (user) {
      const progress = getUserProgress(user.id)
      setUserProgress(progress)

      // If there's a last watched video, set it as selected
      if (progress.lastWatched) {
        const foundVideo = findVideoById(progress.lastWatched)
        if (foundVideo) {
          setSelectedVideo(foundVideo)
          // Find which module this video belongs to
          for (const module of videoProgram) {
            const videoInModule = module.videos.find((v) => v.id === progress.lastWatched)
            if (videoInModule) {
              setActiveTab(module.id.toString())
              break
            }
          }
        }
      } else if (videoProgram.length > 0 && videoProgram[0].videos.length > 0) {
        // If no last watched video, select the first one
        setSelectedVideo(videoProgram[0].videos[0])
      }
    }
  }, [user])

  const findVideoById = (videoId: string) => {
    for (const module of videoProgram) {
      const video = module.videos.find((v) => v.id === videoId)
      if (video) return video
    }
    return null
  }

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video)
    if (user) {
      const progress = getUserProgress(user.id)
      progress.lastWatched = video.id
      saveUserProgress(user.id, progress)
      setUserProgress(progress)

      // Encontrar a qué módulo pertenece el video y actualizar la pestaña activa
      for (const module of videoProgram) {
        const videoInModule = module.videos.find((v) => v.id === video.id)
        if (videoInModule) {
          setActiveTab(module.id.toString())
          break
        }
      }
    }
  }

  const handleVideoComplete = () => {
    if (user && selectedVideo) {
      markVideoAsCompleted(user.id, selectedVideo.id)
      const updatedProgress = getUserProgress(user.id)
      setUserProgress(updatedProgress)
    }
  }

  const isVideoCompleted = (videoId: string) => {
    return userProgress.completedVideos.includes(videoId)
  }

  const calculateModuleProgress = (moduleId: number) => {
    const module = videoProgram.find((m) => m.id === moduleId)
    if (!module) return 0

    const totalInModule = module.videos.length
    const completedInModule = module.videos.filter((v) => isVideoCompleted(v.id)).length

    return (completedInModule / totalInModule) * 100
  }

  const calculateTotalProgress = () => {
    return (userProgress.completedVideos.length / totalVideos) * 100
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Programa de 21 dias.</h1>
        <p className="mt-2 text-gray-600">Cada día tendrás un módulo que te ayudará a implementar el plan de sueño de Carlitos de forma efectiva.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <CardTitle>Tu Progreso</CardTitle>
            <div className="mt-2 md:mt-0">
              <Badge variant="outline" className="text-primary">
                {userProgress.completedVideos.length} de {totalVideos} videos completados
              </Badge>
            </div>
          </div>
          <Progress value={calculateTotalProgress()} className="h-2" />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Módulos</CardTitle>
              <CardDescription>Selecciona un módulo para ver sus videos</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                <TabsList className="flex flex-col items-stretch justify-start h-auto space-y-1">
                  {videoProgram.map((module) => {
                    const progress = calculateModuleProgress(module.id)

                    return (
                      <TabsTrigger key={module.id} value={module.id.toString()} className="justify-between text-left">
                        <div className="flex items-center">
                          {progress === 100 ? (
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          ) : (
                            <div className="mr-2 h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center text-xs">
                              {module.id}
                            </div>
                          )}
                          <span>{module.module}</span>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {Math.round(progress)}%
                        </Badge>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                {videoProgram.map((module) => (
                  <TabsContent key={module.id} value={module.id.toString()} className="mt-0 lg:col-span-2">
                    <div className="lg:hidden">
                      <Card>
                        <CardHeader>
                          <CardTitle>{module.module}</CardTitle>
                          <CardDescription>{module.videos.length} videos en este módulo</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {module.videos.map((video) => (
                              <Card
                                key={video.id}
                                className={`cursor-pointer transition-all hover:shadow-md ${
                                  selectedVideo?.id === video.id ? "ring-2 ring-primary" : ""
                                }`}
                                onClick={() => handleVideoSelect(video)}
                              >
                                <div className="relative">
                                  <img
                                    src={video.thumbnail || "/placeholder.svg"}
                                    alt={video.title}
                                    className="w-full rounded-t-lg object-cover h-[180px]"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="rounded-full bg-black/50 p-3">
                                      <Play className="h-6 w-6 text-white" />
                                    </div>
                                  </div>
                                  {isVideoCompleted(video.id) && (
                                    <div className="absolute top-2 right-2">
                                      <Badge className="bg-green-500">Completado</Badge>
                                    </div>
                                  )}
                                  <div className="absolute bottom-2 right-2">
                                    <Badge variant="outline" className="bg-black/70 text-white">
                                      {video.duration}
                                    </Badge>
                                  </div>
                                </div>
                                <CardContent className="p-4">
                                  <h3 className="font-medium line-clamp-2">{video.title}</h3>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 hidden lg:block">
          {videoProgram.map(
            (module) =>
              activeTab === module.id.toString() && (
                <Card key={module.id}>
                  <CardHeader>
                    <CardTitle>{module.module}</CardTitle>
                    <CardDescription>{module.videos.length} videos en este módulo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {module.videos.map((video) => (
                        <Card
                          key={video.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedVideo?.id === video.id ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => handleVideoSelect(video)}
                        >
                          <div className="relative">
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full rounded-t-lg object-cover h-[180px]"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="rounded-full bg-black/50 p-3">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            {isVideoCompleted(video.id) && (
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-green-500">Completado</Badge>
                              </div>
                            )}
                            <div className="absolute bottom-2 right-2">
                              <Badge variant="outline" className="bg-black/70 text-white">
                                {video.duration}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium line-clamp-2">{video.title}</h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ),
          )}
        </div>
      </div>

      {selectedVideo && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{selectedVideo.title}</CardTitle>
            <CardDescription>{selectedVideo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <VideoPlayer
              videoUrl={selectedVideo.videoUrl}
              thumbnail={selectedVideo.thumbnail}
              onComplete={handleVideoComplete}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (user) {
                  markVideoAsCompleted(user.id, selectedVideo.id)
                  const updatedProgress = getUserProgress(user.id)
                  setUserProgress(updatedProgress)
                }
              }}
              disabled={isVideoCompleted(selectedVideo.id)}
            >
              {isVideoCompleted(selectedVideo.id) ? "Completado" : "Marcar como completado"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

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
    
    ],
  },
  {
    id: 2,
    module: "Entendiendo el sueño de tu bebé",
    videos: [
      {
        id: "v2",
        title: "Fisiología del sueño infantil",
        duration: "10:50",
        thumbnail: "/images/serenibaby-logo.png",
        description:
          "¿Sabías que el sueño de tu bebé es diferente al de los adultos? Aprende sobre sus ciclos de sueño y por qué se despierta tanto.",
        videoUrl: "/videos/dia_1/segundo.mp4",
      }
    ],
  },
  {
    id: 3,
    module: "Puzzle del sueño",
    videos: [
      {
        id: "v3",
        title: "El puzzle del sueño",
        duration: "1:04",
        thumbnail: "/images/serenibaby-logo.png",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "/videos/dia_3/puzzle.mp4",
      }
    ],
  },
  {
    id: 4,
    module: "Horarios ideales para tu peque",
    videos: [
      {
        id: "v6",
        title: "Horarios ideales para tu peque",
        duration: "1:04",
        thumbnail: "/images/serenibaby-logo.png",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "/videos/dia_3/cuarto.mp4",
      }
    ],
  },
  {
    id: 5,
    module: "Rutinas y siestas",
    videos: [
      {
        id: "v6",
        title: "El Rutinas y siestas",
        duration: "1:04",
        thumbnail: "/images/serenibaby-logo.png",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "/videos/dia_5/rutinas.mp4",
      }
    ],
  },
  {
    id: 6,
    module: "Ambiente de sueño",
    videos: [
      {
        id: "v6",
        title: "El puzzle del sueño",
        duration: "1:04",
        thumbnail: "/images/serenibaby-logo.png",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 7,
    module: "Sueño seguro y Colecho seguro",
    videos: [
      {
        id: "v6",
        title: "El puzzle del sueño",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 8,
    module: "Diseñemos tu plan de sueño - Plan acompañamiento",
    videos: [
      {
        id: "v8",
        title: "Diseñemos tu plan de sueño - Plan acompañamiento",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 9,
    module: "Tips prácticos",
    videos: [
      {
        id: "v8",
        title: "Tips prácticos",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 10,
    module: "Despertares nocturnos",
    videos: [
      {
        id: "v8",
        title: "Despertares nocturnos",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 11,
    module: "Evaluación de avance",
    videos: [
      {
        id: "v8",
        title: "Evaluación de avance",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 12,
    module: "Eliminando tomas de leche nocturnas",
    videos: [
      {
        id: "v8",
        title: "Eliminando tomas de leche nocturnas",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 13,
    module: "Peques madrugadores",
    videos: [
      {
        id: "v8",
        title: "Peques madrugadores",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 14,
    module: "Rutinas los fines de semanas",
    videos: [
      {
        id: "v8",
        title: "Rutinas los fines de semanas",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 15,
    module: "Afianzando el sueño autónomo",
    videos: [
      {
        id: "v8",
        title: "Afianzando el sueño autónomo",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 16,
    module: "Regresiones del sueño",
    videos: [
      {
        id: "v8",
        title: "Regresiones del sueño",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 17,
    module: "Transiciones de sueño",
    videos: [
      {
        id: "v8",
        title: "Transiciones de sueño",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 18,
    module: "Transiciones de siesta",
    videos: [
      {
        id: "v8",
        title: "Transiciones de siesta",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 19,
    module: "Autodictado",
    videos: [
      {
        id: "v8",
        title: "Autodictado",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 20,
    module: "Salidas y vacaciones",
    videos: [
      {
        id: "v8",
        title: "Salidas y vacaciones",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
    ],
  },
  {
    id: 21,
    module: "Fin del programa",
    videos: [
      {
        id: "v8",
        title: "Fin del programa",
        duration: "1:04",
        thumbnail: "/placeholder.svg?height=180&width=320",
        description:
          "¿Qué piezas necesitas para que el sueño de tu bebé funcione? Aprende a combinarlas para lograr noches más tranquilas.",
        videoUrl: "https://example.com/video6.mp4",
      }
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
  const [seenVideos, setSeenVideos] = useState<any[]>([])
  const [userProgress, setUserProgress] = useState<{ completedVideos: string[]; lastWatched: string | null }>({
    completedVideos: [],
    lastWatched: null,
  })

  const handleMarkVideoAsSeen = (video:any) =>{
    for( let i = 0; i < seenVideos.length; i++){
      if (seenVideos[i].id === video.id){
        return
      }
    }
    setSeenVideos(prev => [...prev,video])
  }
  const hasSeenVideo = (video:any) =>{
    for( let i = 0; i < seenVideos.length; i++){
      if (seenVideos[i].id === video.id){
        return true
      }
    }
    return false

  }

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
          ()=>(module.id.toString())
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
    return (seenVideos.length / totalVideos) * 100
  }

  const nums =  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
  const dropdownOptions = nums.map((n) => ({ value: n.toString(), label: n.toString() }));


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
                {seenVideos.length} de {totalVideos} videos completados
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
                <div className="sm:hidden">
                <select id="day-select" value={activeTab ?? ''} onChange={(e)=>setActiveTab(e.target.value.toString())}>
        <option value="" disabled>-- Escoge un día --</option>
        {[...Array(21)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            Día {i + 1}
          </option>
        ))}
      </select>


                </div>
              <div className="h-52 sm:h-72 hidden sm:block overflow-y-auto pr-1">
           <TabsList className="flex flex-col items-stretch justify-start space-y-1">
        {videoProgram.map((module) => {
      const progress = calculateModuleProgress(module.id)

      return (
        <TabsTrigger
          key={module.id}
          value={module.id.toString()}
          className="justify-between text-left p-3 bg-white z-10"
        >
          <div className="flex items-center bg-white w-full h-full">
            {progress === 100 ? (
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <div className="mr-2 h-4 w-4 rounded-full border  flex items-center justify-center text-xs">
                {module.id}
              </div>
            )}
            <span>{module.module}</span>
          </div>
        </TabsTrigger>
      )
    })}
  </TabsList>
</div>

                {videoProgram.map((module) => (
                  <TabsContent key={module.id} value={module.id.toString()} className="mt-6 lg:col-span-2">
                    <div className="lg:hidden">
                      <Card>
                        <CardHeader>
                          <CardTitle>{module.module}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {module.videos.map((video) => (   
                                <>
                                <VideoPlayer key={video.id}
                                videoUrl={video.videoUrl}
                                thumbnail={video.thumbnail}
                                onComplete={handleVideoComplete}
                                />
                                 <Button className={hasSeenVideo(video) ? 'bg-slate-300 hover:bg-slate-400 ' : 'bg-[#75DBD1] hover:cursor-pointer'} onClick={()=>handleMarkVideoAsSeen(video)}>
                                  {hasSeenVideo(video) ? '¡Video completado!': 'Marcar como completado '}
                                 
                                 </Button>
                               
                                </>

                                )
                            )}

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
                    <CardTitle>{module.module} -<span className="text-[#75DBD1]"> Día {module.id}</span></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 h-80">
                      {module.videos.map((video) => (
                        <>
                           <VideoPlayer key={video.id}
                           videoUrl={video.videoUrl}
                           thumbnail={video.thumbnail}
                           onComplete={handleVideoComplete}
                           />
                            <Button className={hasSeenVideo(video) ? 'bg-slate-300 hover:bg-slate-400' : 'bg-[#75DBD1]'} onClick={()=>handleMarkVideoAsSeen(video)}>
                             {hasSeenVideo(video) ? '¡Video completado!': 'Marcar como completado '}
                            
                            </Button>
                          
                           </>
                      ))}
                      
                    </div>
                  </CardContent>
                </Card>
              ),
          )}
        </div>
      </div>

     
    </div>
  )
}
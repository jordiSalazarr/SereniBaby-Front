"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MoonIcon, Clock, Sun, Home, Lightbulb } from "lucide-react"

// Datos para el horario recomendado de sueño para un bebé de 9 meses
const sleepSchedule = {
  wakeTime: "7:30",
  nap1: "9:00 (Duración 1h - 1.5h)",
  nap2: "13:00 (Duración 1.5h - 2h)",
  bedtime: "19:00 - 19:30",
}

// Consejos para mejorar el sueño infantil
const sleepTips = [
  {
    id: 1,
    title: "¿Qué rutinas deberías seguir para lograr un descanso reparador?",
    description: "Descubre cómo establecer rutinas efectivas que ayuden a tu hijo a tener un sueño de calidad.",
    icon: Clock,
    color: "bg-primary/10 text-primary",
    link: "/dashboard/tips/routines",
  },
  {
    id: 2,
    title: "¿Cuáles son las ventanas de sueño que debes respetar?",
    description: "Aprende sobre los intervalos óptimos de vigilia entre siestas según la edad de tu hijo.",
    icon: Sun,
    color: "bg-secondary/10 text-secondary",
    link: "/dashboard/tips/sleep-windows",
  },
  {
    id: 3,
    title: "¿Cuál es el ambiente de sueño ideal para conseguir los objetivos?",
    description: "Crea el espacio perfecto para que tu hijo duerma mejor y por más tiempo.",
    icon: Home,
    color: "bg-orange-500/10 text-orange-500",
    link: "/dashboard/tips/sleep-environment",
  },
  {
    id: 4,
    title: "¿Cómo hacer que tu peque se duerma por sí solo?",
    description:
      "Estrategias efectivas para ayudar a tu hijo a desarrollar la habilidad de conciliar el sueño de forma independiente.",
    icon: Home,
    color: "bg-green-500/10 text-green-500",
    link: "/dashboard/tips/self-soothing",
  },
]

export default function Dashboard() {
  const { user } = useAuth()

  // Nombres de ejemplo para la madre y el niño
  const motherName = "Laura"
  const childName = "Carlitos"

  return (
    <div className="space-y-8">
      {/* Mensaje de bienvenida personalizado con nuevo degradado */}
      <div className="rounded-lg bg-[#7bd7c7] p-6 text-center">
        <h1 className="text-3xl font-bold text-white">¡Hola {motherName}!</h1>
        <p className="mt-2 text-lg text-white">Bienvenida a SereniBaby, juntos mejoraremos el sueño de {childName}</p>
      </div>

      {/* Video introductorio con YouTube */}
      <Card className="h-auto w-full">
        <CardHeader>
          <CardTitle>Video Introductorio</CardTitle>
          <CardDescription>Conoce cómo SereniBaby te ayudará a mejorar el sueño de tu hijo</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="aspect-video w-full sm:w-3/4 mx-auto mt-5">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/GKRXlLAyHKY"
    title="Video introductorio de SereniBaby"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>

        </CardContent>
      </Card>

      {/* Plan de sueño actualizado con 4 bloques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MoonIcon className="h-5 w-5 text-primary" />
            Plan de Sueño para {childName}
          </CardTitle>
          <CardDescription>Sigue estas recomendaciones para mejorar el sueño de tu hijo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-[#7bd7c7]  p-4">
           
            <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                <h3 className="font-bold text-white ">Horarios</h3>
              </div>
             <p className="font-medium">• Hora de despertar: 7:30</p>
             <p className="font-medium">• Siesta 1: 9:00h (1h - 1.5h)</p>
             <p className="font-medium">• Siesta 2: 13:00h (1.5h - 2h)</p>
             <p className="font-medium">• Hora de acostarse: 19:00h - 19:30h</p>
</div>

            </div>

            <div className="rounded-lg bg-[#e684c3] p-4">
              <div className="flex items-center gap-2 mt-4">
                <Clock className="h-5 w-5 text-accent " />
                <h3 className="font-bold text-white mt-0 pt-0">Ventana de sueño</h3>
              </div>
              <p className="font-medium mt-3">• 4 horas</p>
            </div>

            <div className="rounded-lg bg-[#7bd7c7]  p-4">
              <div className="flex items-center gap-2 mt-4">
                <Clock className="h-5 w-5 text-[#e684c3]" />
                <h3 className="font-bold text-white">Ambiente de sueño</h3>
              </div>
              <p className="font-medium mt-3">• Preparar 30 minutos antes de ir a dormir</p>
            </div>

            <div className="rounded-lg bg-[#e684c3] p-4 ">
              <div className="flex items-center gap-2 mt-4">
                <MoonIcon className="h-5 w-5 text-accent" />
                <h3 className=" font-bold text-white">Tomas de leche nocturnas</h3>
              </div>
              <p className="font-medium mt-3">• 1 toma de leche a las 3:00</p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border p-4">
            <h3 className="font-medium">Próximos pasos recomendados:</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Registra el sueño diario de {childName} para obtener recomendaciones personalizadas</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Establece una rutina consistente antes de dormir</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-1">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Revisa los consejos específicos para bebés de 9 meses</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

     

      {/* Dato curioso */}
      <Card>
        <CardHeader>
          <CardTitle>¿Sabías que?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-accent/20 p-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-accent p-2">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Dato curioso sobre el sueño infantil</h3>
                <p className="mt-1 text-gray-600">
                  Los bebés que duermen bien tienen mejor desarrollo cognitivo y emocional. El sueño es cuando el
                  cerebro procesa lo aprendido durante el día y consolida la memoria.
                </p>
                <div className="mt-3">
                  <Badge variant="outline" className="text-primary">
                    Actualizado semanalmente
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

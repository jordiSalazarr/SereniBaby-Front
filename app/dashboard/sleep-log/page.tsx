"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar, AlarmClock, Moon, Sunrise, Sunset, Play, Square, Clock, MoonIcon, SunIcon, BellIcon, BedDoubleIcon } from "lucide-react"
import { saveSleepLog, saveNap,getSleepLogs,getNaps, SleepLog, Nap, clearAllSleepLogs, clearAllNaps } from "@/lib/local-storage"
import {Calendar as NewCalendar} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SleepTable from "./components/SleepTable"


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const SectionCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <div>
    <h3 className="flex items-center gap-2 text-md font-semibold text-gray-800 mb-3">
      {icon}
      {title}
    </h3>
    <div className="space-y-2">{children}</div>
  </div>
)

const LogItem = ({ date, time, note }: { date: string, time: string, note?: string }) => (
  <div className="flex flex-col bg-gray-50 px-3 py-2 border text-sm text-gray-700 rounded-lg ">
  <div className="flex items-center justify-between ">
    <span>{new Date(date).toLocaleDateString()}</span>
    <span className="font-medium">{time}</span>
    
  </div>
  {note && <span>{note}</span>}
 
  </div>
)
export default function ProgramaPage() {
  const { user } = useAuth()

  // Estado para la fecha seleccionada
  const [value, onChangeVal] = useState<Value>(new Date());

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const formattedDate = format(selectedDate, "yyyy-MM-dd")

  // Estado para el widget activo
  const [activeWidget, setActiveWidget] = useState<string | null>(null)

  // Estados para los timers
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerStartTime, setTimerStartTime] = useState<Date | null>(null)
  const [timerDuration, setTimerDuration] = useState(0)

  // Estados para los formularios
  const [wakeUpTime, setWakeUpTime] = useState("")
  const [bedTime, setBedTime] = useState("")
  const [napStartTime, setNapStartTime] = useState("")
  const [napEndTime, setNapEndTime] = useState("")
  const [nightWakeStartTime, setNightWakeStartTime] = useState("")
  const [nightWakeEndTime, setNightWakeEndTime] = useState("")
  const [notes, setNotes] = useState("")
  const [naps,setNaps] = useState<Nap[]>([])
  const [sleepLogs,setSleepLogs] = useState<SleepLog[]>([])
  const [seeLogsHistory,setSeeLogsHistory] = useState<boolean>(false)


  // Estado para minutos previos
  const [previousMinutes, setPreviousMinutes] = useState(0)

  // Estado para mostrar mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [open, setOpen] = useState(false)

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setOpen(false) // Cierra el Popover al seleccionar una fecha
  }
  useEffect(() => {
    let interval: NodeJS.Timeout
  
    if (isTimerRunning && timerStartTime) {
      interval = setInterval(() => {
        const now = new Date()
        const elapsedSeconds = Math.floor((now.getTime() - timerStartTime.getTime()) / 1000)
        setTimerDuration(elapsedSeconds)
      }, 1000)
    }
  
    return () => clearInterval(interval)
  }, [isTimerRunning, timerStartTime])
   useEffect(()=>{
       const sleepLogs = getSleepLogs("randomUser")
       setSleepLogs(sleepLogs)
       const naps = getNaps("randomUser")
       setNaps(naps)
   },[])
  // Efecto para el cronómetro
  useState(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning && timerStartTime) {
      interval = setInterval(() => {
        const now = new Date()
        const diff = now.getTime() - timerStartTime.getTime()
        setTimerDuration(Math.floor(diff / 1000))
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  })

  // Función para formatear la duración del cronómetro
   const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleResetHistory = () => {
    clearAllSleepLogs()
    clearAllNaps()
    setSleepLogs([])
    setNaps([])
  }

  // Función para iniciar el cronómetro
  const startTimer = () => {
    const now = new Date()

    // Si hay minutos previos, ajustamos la hora de inicio
    if (previousMinutes > 0) {
      const adjustedStartTime = new Date(now.getTime() - previousMinutes * 60 * 1000)
      setTimerStartTime(adjustedStartTime)

      if (activeWidget === "siesta") {
        setNapStartTime(format(adjustedStartTime, "HH:mm"))
      } else if (activeWidget === "despertar-nocturno") {
        setNightWakeStartTime(format(adjustedStartTime, "HH:mm"))
      }

      setTimerDuration(previousMinutes * 60) // Establecer la duración inicial en segundos
    } else {
      setTimerStartTime(now)

      if (activeWidget === "siesta") {
        setNapStartTime(format(now, "HH:mm"))
      } else if (activeWidget === "despertar-nocturno") {
        setNightWakeStartTime(format(now, "HH:mm"))
      }
    }

    setIsTimerRunning(true)
  }

  // Función para detener el cronómetro
  const stopTimer = () => {
    if (!timerStartTime) return

    const now = new Date()

    if (activeWidget === "siesta") {
      setNapEndTime(format(now, "HH:mm"))
    } else if (activeWidget === "despertar-nocturno") {
      setNightWakeEndTime(format(now, "HH:mm"))
    }

    setIsTimerRunning(false)
  }

  // Función para guardar los datos
  const handleSave = () => {
    // if (!user) return

    try {
      if (activeWidget === "despertar") {
        // Guardar hora de despertar
        const newLog = saveSleepLog({
          userId: "randomUser",
          date: formattedDate,
          sleepTime: "", // Se completará cuando se registre la hora de acostarse
          wakeTime: wakeUpTime,
          wakeups: 0,
          notes: notes,
          isSleepHour:false
        })
        setSleepLogs(prev=>[...prev,newLog])

        setSuccessMessage("Hora de despertar guardada correctamente")
      } else if (activeWidget === "acostarse") {
        // Guardar hora de acostarse
        const newLog = saveSleepLog({
          userId: "randomUser",
          date: formattedDate,
          sleepTime: bedTime,
          wakeTime: "", // Se completará cuando se registre la hora de despertar
          wakeups: 0,
          notes: notes,
          isSleepHour:true
        })
        setSleepLogs(prev=>[...prev,newLog])
        setSuccessMessage("Hora de acostarse guardada correctamente")
      } else if (activeWidget === "siesta") {
        // Guardar siesta
        const newNap = saveNap({
          userId: "randomUser",
          date: formattedDate,
          startTime: napStartTime,
          endTime: napEndTime,
          notes: notes,
        })
        setNaps(prev=>[...prev,newNap])

        setSuccessMessage("Siesta guardada correctamente")
      } else if (activeWidget === "despertar-nocturno") {
        // Guardar despertar nocturno como nota en el registro de sueño
        const wakeupEvent = {
          time: nightWakeStartTime,
          endTime: nightWakeEndTime,
          duration: timerDuration,
          notes: notes,
        }

        const newLog = saveSleepLog({
          userId: "randomUser",
          date: formattedDate,
          sleepTime: "",
          wakeTime: "",
          wakeups: 1,
          notes: JSON.stringify([wakeupEvent]),
          isSleepHour:true
        })
        setSleepLogs(prev=>[...prev,newLog])
        setSuccessMessage("Despertar nocturno guardado correctamente")
      }

      // Mostrar mensaje de éxito
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 1500)

      // Resetear formulario
      resetForm()
    } catch (error) {
      console.error("Error guardando datos:", error)
    }
  }

  // Función para resetear el formulario
  const resetForm = () => {
    setActiveWidget(null)
    setWakeUpTime("")
    setBedTime("")
    setNapStartTime("")
    setNapEndTime("")
    setNightWakeStartTime("")
    setNightWakeEndTime("")
    setNotes("")
    setPreviousMinutes(0)
    setTimerStartTime(null)
    setTimerDuration(0)
    setIsTimerRunning(false)
  }

  return (
    <>
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Programa de Sueño</h1>
        <p className="mt-2 text-gray-600">Registra los horarios de sueño de tu hijo</p>
      </div>

      {/* Selector de fecha */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />

            Seleccionar Fecha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
                {format(selectedDate, "PPP", { locale: es })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <NewCalendar  onChange={(date:any)=>handleDateChange(date)} value={selectedDate} />

              </PopoverContent>
            </Popover>
            <Button onClick={()=> setSeeLogsHistory(prev=>!prev)} className="mt-4 mb-4">
             {seeLogsHistory ? 'Ocultar historial del sueño' : 'Ver historial del sueño'}
           </Button>
          </div>
        </CardContent>
      </Card>

      {/* Widgets principales */}
      {!activeWidget && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActiveWidget("despertar")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-orange-100 p-3">
                  <Sunrise className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Hora de despertar</h3>
                  <p className="text-sm text-gray-500">Registra a qué hora se despertó tu hijo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveWidget("siesta")}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <AlarmClock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Siesta</h3>
                  <p className="text-sm text-gray-500">Registra las siestas durante el día</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActiveWidget("acostarse")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <Sunset className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Hora de acostarse</h3>
                  <p className="text-sm text-gray-500">Registra a qué hora se acostó tu hijo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setActiveWidget("despertar-nocturno")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-secondary/10 p-3">
                  <Moon className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Despertar nocturno</h3>
                  <p className="text-sm text-gray-500">Registra los despertares durante la noche</p>
                </div>
              </div>
            </CardContent>
          </Card>

          
        </div>
      )}

      {/* Formulario para Hora de despertar */}
      {activeWidget === "despertar" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sunrise className="h-5 w-5 text-orange-500" />
              Hora de despertar
            </CardTitle>
            <CardDescription>Registra a qué hora se despertó tu hijo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wakeUpTime">Hora de despertar</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  id="wakeUpTime"
                  type="time"
                  value={wakeUpTime}
                  onChange={(e) => setWakeUpTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Cualquier observación relevante..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!wakeUpTime}>
              Guardar
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Formulario para Hora de acostarse */}
      {activeWidget === "acostarse" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sunset className="h-5 w-5 text-blue-500" />
              Hora de acostarse
            </CardTitle>
            <CardDescription>Registra a qué hora se acostó tu hijo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bedTime">Hora de acostarse</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <Input id="bedTime" type="time" value={bedTime} onChange={(e) => setBedTime(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Cualquier observación relevante..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!bedTime}>
              Guardar
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Formulario para Siesta */}
      {activeWidget === "siesta" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlarmClock className="h-5 w-5 text-primary" />
              Siesta
            </CardTitle>
            <CardDescription>Registra las siestas durante el día</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="timer" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="timer">Cronómetro</TabsTrigger>
                <TabsTrigger value="manual">Programado</TabsTrigger>
              </TabsList>

              <TabsContent value="timer" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex  flex-col items-start mt-4 justify-start sm:flex-row sm:items-justify sm:justify-between">
                    <Label>Cronómetro de siesta</Label>
                    {!isTimerRunning && (
                      <div className="flex items-center gap-2">
                        <Label htmlFor="previousMinutes" className="text-sm whitespace-nowrap">
                          ¿Ya lleva durmiendo?
                        </Label>
                        <div className="flex items-center gap-1">
                          <Input
                            id="previousMinutes"
                            type="number"
                            min="0"
                            max="300"
                            placeholder="0"
                            className="w-20"
                            onChange={(e) => setPreviousMinutes(Number.parseInt(e.target.value) || 0)}
                          />
                          <span className="text-sm">min</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-md border p-3 text-center w-full">
                      <span className="text-2xl font-mono">{formatDuration(timerDuration)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={startTimer}
                        disabled={isTimerRunning}
                        className="text-green-500"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={stopTimer}
                        disabled={!isTimerRunning}
                        className="text-red-500"
                      >
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {isTimerRunning && <div className="text-sm text-muted-foreground">Inicio: {napStartTime}</div>}

                  {napStartTime && napEndTime && (
                    <div className="text-sm text-muted-foreground">
                      Duración: {napStartTime} - {napEndTime}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="napStart">Inicio de siesta</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <Input
                        id="napStart"
                        type="time"
                        value={napStartTime}
                        onChange={(e) => setNapStartTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="napEnd">Fin de siesta</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <Input
                        id="napEnd"
                        type="time"
                        value={napEndTime}
                        onChange={(e) => setNapEndTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Cualquier observación relevante..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!napStartTime || !napEndTime}>
              Guardar
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Formulario para Despertar nocturno */}
      {activeWidget === "despertar-nocturno" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-secondary" />
              Despertar nocturno
            </CardTitle>
            <CardDescription>Registra los despertares durante la noche</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="timer" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="timer">Cronómetro</TabsTrigger>
                <TabsTrigger value="manual">Programado</TabsTrigger>
              </TabsList>

              <TabsContent value="timer" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Cronómetro de despertar</Label>
                    {!isTimerRunning && (
                      <div className="flex items-center gap-2">
                        <Label htmlFor="previousMinutes" className="text-sm whitespace-nowrap">
                          ¿Ya lleva despierto?
                        </Label>
                        <div className="flex items-center gap-1">
                          <Input
                            id="previousMinutes"
                            type="number"
                            min="0"
                            max="300"
                            placeholder="0"
                            className="w-20"
                            onChange={(e) => setPreviousMinutes(Number.parseInt(e.target.value) || 0)}
                          />
                          <span className="text-sm">min</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-md border p-3 text-center w-full">
                      <span className="text-2xl font-mono">{formatDuration(timerDuration)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={startTimer}
                        disabled={isTimerRunning}
                        className="text-green-500"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={stopTimer}
                        disabled={!isTimerRunning}
                        className="text-red-500"
                      >
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {isTimerRunning && <div className="text-sm text-muted-foreground">Inicio: {nightWakeStartTime}</div>}

                  {nightWakeStartTime && nightWakeEndTime && (
                    <div className="text-sm text-muted-foreground">
                      Duración: {nightWakeStartTime} - {nightWakeEndTime}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="manual" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nightWakeStart">Inicio del despertar</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <Input
                        id="nightWakeStart"
                        type="time"
                        value={nightWakeStartTime}
                        onChange={(e) => setNightWakeStartTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nightWakeEnd">Fin del despertar</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <Input
                        id="nightWakeEnd"
                        type="time"
                        value={nightWakeEndTime}
                        onChange={(e) => setNightWakeEndTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas adicionales</Label>
              <Textarea
                id="notes"
                placeholder="Motivo del despertar, comportamiento, etc..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!nightWakeStartTime || !nightWakeEndTime}>
              Guardar
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed bottom-24 z-10 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}
    </div>
    
      {seeLogsHistory && (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle>Historial de Sueño</CardTitle>
      <CardDescription>Visualiza los registros de sueño anteriores</CardDescription>
      {sleepLogs.length > 0 || naps.length > 0 ? <Button className="w-40 bg-red-500 hover:bg-red-600" onClick={handleResetHistory}>Reset del historial</Button>:<></>}
    </CardHeader>
    <CardContent>
  {sleepLogs.length === 0 && naps.length === 0 ? (
    <div className="flex h-[200px] items-center mt-4 justify-center">
      <div className="flex flex-col items-center text-center">
        <MoonIcon className="h-16 w-16 text-gray-300" />
        <p className="mt-4 text-gray-500">
          Aún no hay registros de sueño. Comienza a registrar el sueño de tu hijo para ver el historial aquí.
        </p>
      </div>
    </div>
  ) : (
    <div className="space-y-6 mt-4">
    <SleepTable
        naps={naps}
        sleepLogs={sleepLogs}
    />
    </div>
  )}
</CardContent>

  </Card>
)}

    
    </>


  )
}

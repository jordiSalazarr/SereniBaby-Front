"use client"

import type React from "react"

import { FaSun, FaMoon } from 'react-icons/fa';
import {Calendar as NewCalendar} from 'react-calendar';
import { useState, useEffect } from "react"
import 'react-calendar/dist/Calendar.css';
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { saveSleepLog, saveNap, getSleepLogs, getNaps, type SleepLog, type Nap } from "@/lib/local-storage"
import { MoonIcon, SunIcon, Clock, Play, Square, Plus, Trash2, Calendar } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Modificar el tipo WakeupEvent para incluir duración
type WakeupEvent = {
  id: string
  time: string
  endTime?: string // Hora de fin opcional
  duration?: number // Duración en segundos
  notes: string
}

export default function SleepLogPage() {
  const { user } = useAuth()
  const [sleepTime, setSleepTime] = useState("")
  const [wakeTime, setWakeTime] = useState("")
  const [napStart, setNapStart] = useState("")
  const [napEnd, setNapEnd] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([])
  const [naps, setNaps] = useState<Nap[]>([])
  const [sleepOption,setSleepOption] = useState("")

  // Estado para el selector de fecha
  const [selectedDate, setSelectedDate] = useState<any>(new Date())
  const formattedDate = format(selectedDate, "yyyy-MM-dd")

  // Estado para el cronómetro de siesta
  const [isNapRunning, setIsNapRunning] = useState(false)
  const [napStartTime, setNapStartTime] = useState<Date | null>(null)
  const [napDuration, setNapDuration] = useState(0)

  // Estado para los despertares nocturnos
  const [wakeupEvents, setWakeupEvents] = useState<WakeupEvent[]>([])
  const [newWakeupTime, setNewWakeupTime] = useState("")
  const [newWakeupNotes, setNewWakeupNotes] = useState("")

  // Añadir estados para el cronómetro de despertares
  const [activeWakeupId, setActiveWakeupId] = useState<string | null>(null)
  const [wakeupStartTime, setWakeupStartTime] = useState<Date | null>(null)
  const [wakeupDuration, setWakeupDuration] = useState(0)

  // Estados para minutos previos
  const [previousNapMinutes, setPreviousNapMinutes] = useState(0)
  const [previousWakeupMinutes, setPreviousWakeupMinutes] = useState(0)

  useEffect(() => {
    if (user) {
      // Load sleep logs and naps from local storage
      setSleepLogs(getSleepLogs(user.id))
      setNaps(getNaps(user.id))
    }
  }, [user])

  // Efecto para el cronómetro de siesta
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isNapRunning && napStartTime) {
      interval = setInterval(() => {
        const now = new Date()
        const diff = now.getTime() - napStartTime.getTime()
        setNapDuration(Math.floor(diff / 1000))
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isNapRunning, napStartTime])

  // Añadir efecto para el cronómetro de despertares
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (activeWakeupId && wakeupStartTime) {
      interval = setInterval(() => {
        const now = new Date()
        const diff = now.getTime() - wakeupStartTime.getTime()
        setWakeupDuration(Math.floor(diff / 1000))
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [activeWakeupId, wakeupStartTime])

  const handleSleepLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // if (!user) return

    setLoading(true)
    try {
      const newLog = saveSleepLog({
        userId: "random",
        date: formattedDate,
        sleepTime,
        wakeTime,
        isSleepHour: sleepOption === "sleep",
        wakeups: wakeupEvents.length,
        notes: JSON.stringify(wakeupEvents), // Guardar los despertares como JSON en el campo notes
      })

      // Update the UI with the new log
      setSleepLogs([...sleepLogs, newLog])

      // Reset form
      setSleepTime("")
      setWakeTime("")
      setWakeupEvents([])
      setNotes("")

      alert("Registro de sueño guardado correctamente")
    } catch (error) {
      console.error("Error adding sleep log:", error)
      alert("Error al guardar el registro de sueño")
    } finally {
      setLoading(false)
    }
  }

  const handleNapSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // if (!user) return

    setLoading(true)
    try {
      const newNap = saveNap({
        userId: "random",
        date: formattedDate,
        startTime: napStart,
        endTime: napEnd,
        notes,
      })

      // Update the UI with the new nap
      setNaps([...naps, newNap])

      // Reset form
      setNapStart("")
      setNapEnd("")
      setNotes("")

      alert("Siesta registrada correctamente")
    } catch (error) {
      console.error("Error adding nap:", error)
      alert("Error al guardar la siesta")
    } finally {
      setLoading(false)
    }
  }

  // Función para iniciar el cronómetro de siesta
  const startNap = () => {
    const now = new Date()
    setNapStartTime(now)
    setNapStart(format(now, "HH:mm"))
    setIsNapRunning(true)
  }

  // Función para detener el cronómetro de siesta
  const stopNap = () => {
    if (!napStartTime) return

    const now = new Date()
    setNapEnd(format(now, "HH:mm"))
    setIsNapRunning(false)
  }

  // Función para formatear la duración del cronómetro
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Modificar la función para agregar un despertar
  const addWakeupEvent = () => {
    if (!newWakeupTime) return

    const newEvent: WakeupEvent = {
      id: Date.now().toString(),
      time: newWakeupTime,
      notes: newWakeupNotes,
    }

    setWakeupEvents([...wakeupEvents, newEvent])
    setNewWakeupTime("")
    setNewWakeupNotes("")
  }

  // Añadir función para iniciar el cronómetro de despertar
  const startWakeupTimer = () => {
    const now = new Date()
    const newWakeupId = Date.now().toString()

    const newEvent: WakeupEvent = {
      id: newWakeupId,
      time: format(now, "HH:mm"),
      notes: "",
    }

    setWakeupEvents([...wakeupEvents, newEvent])
    setActiveWakeupId(newWakeupId)
    setWakeupStartTime(now)
  }

  // Añadir función para detener el cronómetro de despertar
  const stopWakeupTimer = () => {
    if (!activeWakeupId || !wakeupStartTime) return

    const now = new Date()
    const endTime = format(now, "HH:mm")
    const duration = wakeupDuration

    setWakeupEvents(
      wakeupEvents.map((event) => (event.id === activeWakeupId ? { ...event, endTime, duration } : event)),
    )

    setActiveWakeupId(null)
    setWakeupStartTime(null)
    setWakeupDuration(0)
  }

  // Modificar la función para actualizar las notas de un despertar
  const updateWakeupNotes = (id: string, notes: string) => {
    setWakeupEvents(wakeupEvents.map((event) => (event.id === id ? { ...event, notes } : event)))
  }

  // Función para eliminar un despertar nocturno
  const removeWakeupEvent = (id: string) => {
    setWakeupEvents(wakeupEvents.filter((event) => event.id !== id))
  }

  // Función para iniciar el cronómetro de siesta teniendo en cuenta minutos previos
  const startNapWithPrevious = () => {
    const now = new Date()

    // Si hay minutos previos, ajustamos la hora de inicio
    if (previousNapMinutes > 0) {
      const adjustedStartTime = new Date(now.getTime() - previousNapMinutes * 60 * 1000)
      setNapStartTime(adjustedStartTime)
      setNapStart(format(adjustedStartTime, "HH:mm"))
      setNapDuration(previousNapMinutes * 60) // Establecer la duración inicial en segundos
    } else {
      setNapStartTime(now)
      setNapStart(format(now, "HH:mm"))
    }

    setIsNapRunning(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Registro de Sueño</h1>
        <p className="mt-2 text-gray-600">
          Registra los patrones de sueño de tu hijo para obtener recomendaciones personalizadas
        </p>
      </div>

      {/* Selector de fecha */}
      <Card >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Seleccionar Fecha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP", { locale: es })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
              <NewCalendar onChange={(date) => date && setSelectedDate(date)} value={selectedDate} />
              </PopoverContent>
            </Popover>
            <p className="text-sm text-muted-foreground">Selecciona la fecha para el registro de sueño</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="night" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="night" className="flex items-center">
            <MoonIcon className="mr-2 h-4 w-4" />
            Hora de despertar y acostar
          </TabsTrigger>
          <TabsTrigger value="nap" className="flex items-center">
            <SunIcon className="mr-2 h-4 w-4" />
            Siestas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="night">
         <Card>
  <CardHeader>
    <CardTitle>Registrar Sueño</CardTitle>
    <CardDescription>Selecciona el tipo de registro e ingresa la hora</CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSleepLogSubmit} className="space-y-4">
      <div className="space-y-2 flex flex-col">
        <Label htmlFor="entryType">Tipo de registro:   </Label>
        <select
          id="entryType"
          className="w-full sm:w-1/2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={sleepOption}
          onChange={(e) => setSleepOption(e.target.value)}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="wake">Hora de despertar</option>
          <option value="sleep">Hora de dormir</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="entryTime">Hora</Label>
        <div className="flex items-center">
          <Input
           className="w-full sm:w-1/2"
            id="entryTime"
            type="time"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
            required
          />
        </div>
      </div>


                {/* Sección de despertares nocturnos */}
                {/* <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Despertares nocturnos ({wakeupEvents.length})</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={startWakeupTimer}
                          disabled={!!activeWakeupId}
                          className="flex items-center gap-1 text-green-500"
                        >
                          <Play className="h-4 w-4" />
                          Iniciar despertar
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addWakeupEvent}
                          disabled={!newWakeupTime || !!activeWakeupId}
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-4 w-4" />
                          Agregar manualmente
                        </Button>
                      </div>
                    </div>

                    {!activeWakeupId && (
                      <div className="flex items-center justify-end gap-2">
                        <Label htmlFor="previousWakeupMinutes" className="text-sm whitespace-nowrap">
                          ¿Ya lleva despierto?
                        </Label>
                        <div className="flex items-center gap-1">
                          <Input
                            id="previousWakeupMinutes"
                            type="number"
                            min="0"
                            max="300"
                            placeholder="0"
                            className="w-20"
                            onChange={(e) => setPreviousWakeupMinutes(Number.parseInt(e.target.value) || 0)}
                          />
                          <span className="text-sm">min</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {activeWakeupId && (
                    <div className="rounded-md border border-yellow-300 bg-yellow-50 p-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <h4 className="font-medium text-yellow-800">Despertar en curso</h4>
                          <p className="text-sm text-yellow-700">
                            Inicio: {wakeupEvents.find((e) => e.id === activeWakeupId)?.time || ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-mono text-yellow-800">{formatDuration(wakeupDuration)}</div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={stopWakeupTimer}
                            className="text-red-500"
                          >
                            <Square className="h-4 w-4 mr-1" />
                            Finalizar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!activeWakeupId && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="wakeupTime">Hora del despertar</Label>
                        <Input
                          id="wakeupTime"
                          type="time"
                          value={newWakeupTime}
                          onChange={(e) => setNewWakeupTime(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="wakeupNotes">Notas</Label>
                        <div className="flex gap-2">
                          <Input
                            id="wakeupNotes"
                            placeholder="Motivo del despertar, duración, etc."
                            value={newWakeupNotes}
                            onChange={(e) => setNewWakeupNotes(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lista de despertares agregados */}
                  {/* {wakeupEvents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <Label>Despertares registrados:</Label>
                      <div className="rounded-md border divide-y">
                        {wakeupEvents.map((event) => (
                          <div key={event.id} className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{event.time}</p>
                                {event.endTime && (
                                  <>
                                    <span className="text-gray-500">-</span>
                                    <p className="font-medium">{event.endTime}</p>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                      {event.duration ? formatDuration(event.duration) : ""}
                                    </span>
                                  </>
                                )}
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeWakeupEvent(event.id)}
                                className="text-red-500 hover:text-red-700"
                                disabled={event.id === activeWakeupId}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="mt-1">
                              <Input
                                placeholder="Añadir notas sobre este despertar..."
                                value={event.notes}
                                onChange={(e) => updateWakeupNotes(event.id, e.target.value)}
                                disabled={event.id === activeWakeupId}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div> */} 

<Button
        type="submit"
        className="w-full  bg-primary hover:bg-primary/90"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar Registro"}
      </Button>
    </form>
  </CardContent>
</Card>
        </TabsContent>

        <TabsContent value="nap">
          <Card>
            <CardHeader>
              <CardTitle>Registrar Siesta</CardTitle>
              <CardDescription>Ingresa la información de las siestas de tu hijo</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNapSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="napStart">Inicio de siesta</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <Input
                        id="napStart"
                        type="time"
                        value={napStart}
                        onChange={(e) => setNapStart(e.target.value)}
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
                        value={napEnd}
                        onChange={(e) => setNapEnd(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Cronómetro de siesta */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Cronómetro de siesta</Label>
                    {!isNapRunning && (
                      <div className="flex items-center gap-2">
                        <Label htmlFor="previousNapMinutes" className="text-sm whitespace-nowrap">
                          ¿Ya lleva durmiendo?
                        </Label>
                        <div className="flex items-center gap-1">
                          <Input
                            id="previousNapMinutes"
                            type="number"
                            min="0"
                            max="300"
                            placeholder="0"
                            className="w-20"
                            onChange={(e) => setPreviousNapMinutes(Number.parseInt(e.target.value) || 0)}
                          />
                          <span className="text-sm">min</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="rounded-md border p-3 text-center w-full">
                      <span className="text-2xl font-mono">{formatDuration(napDuration)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={startNapWithPrevious}
                        disabled={isNapRunning}
                        className="text-green-500"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={stopNap}
                        disabled={!isNapRunning}
                        className="text-red-500"
                      >
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Usa el cronómetro para registrar automáticamente la duración de la siesta. Si el bebé ya lleva
                    durmiendo, indica los minutos antes de iniciar.
                  </p>
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

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Siesta"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Sueño</CardTitle>
          <CardDescription>Visualiza los registros de sueño anteriores</CardDescription>
        </CardHeader>
        <CardContent>
          {sleepLogs.length === 0 && naps.length === 0 ? (
            <div className="flex h-[200px] items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <MoonIcon className="h-16 w-16 text-gray-300" />
                <p className="mt-4 text-gray-500">
                  Aún no hay registros de sueño. Comienza a registrar el sueño de tu hijo para ver el historial aquí.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {sleepLogs.length > 0 && (
                <div>
                  <h3 className="mb-2 font-medium">Sueño Nocturno</h3>
                  <div className="space-y-2">
                    {sleepLogs.map((log) => (
                      <div key={log.id} className="rounded-lg border p-3">
                        <div className="flex justify-between">
                          <div className="font-medium">
                            <p>{log.isSleepHour ? 'Acostar' : 'Despertar'} del {new Date(log.date).toLocaleDateString()}</p>
                            </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            {log.sleepTime}
                            <p>{log.isSleepHour ? <FaMoon color="purple" /> : < FaSun color="yellow" />}</p>
                          </div>
                        </div>
                        {/* <div className="mt-1 text-sm">Despertares: {log.wakeups}</div>
                        {log.notes && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-gray-500">Detalles de despertares:</p>
                            <div className="mt-1 space-y-1">
                              {(() => {
                                try {
                                  const wakeupData = JSON.parse(log.notes) as WakeupEvent[]
                                  return wakeupData.map((event, index) => (
                                    <div key={index} className="text-xs text-gray-600 border-l-2 border-gray-200 pl-2">
                                      <span className="font-medium">{event.time}</span>
                                      {event.endTime && (
                                        <>
                                          <span> - {event.endTime}</span>
                                          <span className="ml-2 text-xs bg-gray-100 px-1 py-0.5 rounded-full">
                                            {event.duration ? formatDuration(event.duration) : ""}
                                          </span>
                                        </>
                                      )}
                                      {event.notes && <span className="block mt-0.5 ml-2">{event.notes}</span>}
                                    </div>
                                  ))
                                } catch (e) {
                                  return <div className="text-xs text-gray-600">{log.notes}</div>
                                }
                              })()}
                            </div>
                          </div>
                        )} */}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {naps.length > 0 && (
                <div>
                  <h3 className="mb-2 font-medium">Siestas</h3>
                  <div className="space-y-2">
                    {naps.map((nap) => (
                      <div key={nap.id} className="rounded-lg border p-3">
                        <div className="flex justify-between">
                          <div className="font-medium">{new Date(nap.date).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">
                            {nap.startTime} - {nap.endTime}
                          </div>
                        </div>
                        {nap.notes && <div className="mt-1 text-sm text-gray-600">{nap.notes}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

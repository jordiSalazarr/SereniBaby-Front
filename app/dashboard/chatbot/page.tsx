"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SendIcon, User } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Mock responses for the chatbot
const mockResponses = [
  "Para mejorar el sueño de tu hijo, es importante establecer una rutina constante antes de dormir. Esto ayuda a que su cuerpo reconozca las señales de que es hora de descansar.",
  "Los despertares nocturnos son normales en niños pequeños. Si tu hijo se despierta frecuentemente, intenta mantener las interacciones nocturnas breves y tranquilas para no estimularlo demasiado.",
  "La temperatura ideal para la habitación de tu hijo es entre 18-21°C. Un ambiente fresco favorece un sueño más profundo y reparador.",
  "Las siestas son importantes para el desarrollo de tu hijo. Dependiendo de su edad, puede necesitar entre 1-3 siestas diarias. Observa sus señales de cansancio para determinar el momento adecuado.",
  "La luz azul de dispositivos electrónicos puede interferir con la producción de melatonina. Evita pantallas al menos una hora antes de dormir.",
  "Un objeto de transición como un peluche o manta puede ayudar a tu hijo a sentirse seguro y conciliar el sueño más fácilmente.",
  "Si tu hijo tiene dificultades para dormir, considera revisar su alimentación. Evita alimentos con cafeína o azúcares antes de dormir.",
  "El ruido blanco puede ayudar a algunos niños a dormir mejor, especialmente si viven en entornos ruidosos.",
]

// Save and load chat history from localStorage
const saveChatHistory = (userId: string, messages: Message[]) => {
  localStorage.setItem(`chat_history_${userId}`, JSON.stringify(messages))
}

const loadChatHistory = (userId: string): Message[] => {
  const history = localStorage.getItem(`chat_history_${userId}`)
  if (history) {
    const parsed = JSON.parse(history)
    return parsed.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }))
  }
  return [
    {
      id: "1",
      content: "¡Hola! Soy SonIA, tu asistente personal. ¿En qué puedo ayudarte con el sueño de tu hijo hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]
}

export default function Chatbot() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      setMessages(loadChatHistory(user.id))
    }
  }, [user])

  useEffect(() => {
    if (user && messages.length > 0) {
      saveChatHistory(user.id, messages)
    }
  }, [user, messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    console.log("sending message...")
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SonIA</h1>
        <p className="mt-2 text-gray-600">Consulta con nuestra asesora de sueño virtual 24/7 sobre el sueño de Carlitos.</p>
      </div>

      <Card className="h-[70vh] flex flex-col">
        <CardHeader>
          <CardDescription>Haz preguntas sobre rutinas de sueño, despertares nocturnos, siestas y más</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.sender === "bot" && (
                    <Avatar className="h-10 w-10 border border-primary">
                      <AvatarImage src="/images/sonia-avatar.png" alt="SonIA" />
                      <AvatarFallback className="bg-primary text-white">IA</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.sender === "user" ? "bg-secondary text-white" : "bg-accent text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 bg-secondary">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="h-10 w-10 border border-primary">
                    <AvatarImage src="/images/sonia-avatar.png" alt="SonIA" />
                    <AvatarFallback className="bg-primary text-white">IA</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-accent px-4 py-2 text-gray-800">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-grow"
              disabled={isTyping}
            />
            <Button type="submit" disabled={isTyping || !input.trim()}>
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

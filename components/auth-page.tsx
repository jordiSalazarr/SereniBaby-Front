"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

export default function AuthPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    setMounted(true)
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (!mounted) return null

  // Versión móvil optimizada
  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col">
        {/* Sección superior con logo más compacto */}
        <div className="bg-[#7DDFD2] py-4 px-4 flex flex-col items-center">
          <div className="h-16 w-48 relative mb-2">
            <Image
              src="/images/new_logo_blank.png"
              alt="SereniBaby Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <p className="text-sm text-white text-center">Ayudamos a las madres a mejorar el sueño de sus hijos</p>
        </div>

        {/* Sección de formulario */}
        <div className="flex-1 bg-white px-4 pt-4 pb-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  // Versión de escritorio original
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center bg-[#7DDFD2] p-8">
        <div className="max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-32 w-64 relative">
              <Image
                src="/images/new_logo_blank.png"
                alt="SereniBaby Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
          <p className="text-lg text-white">
            Ayudamos a las madres a mejorar el sueño de sus hijos con seguimiento personalizado y consejos de expertos.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="h-16 w-full relative">
              <Image
                src="/images/serenibaby-logo.png"
                alt="SereniBaby Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

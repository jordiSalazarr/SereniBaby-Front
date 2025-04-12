import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"

export const metadata: Metadata = {
  title: "SereniBaby - Mejora el sueño de tus hijos",
  description: "Aplicación para ayudar a las madres a mejorar el sueño de sus hijos",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-0 pb-20 md:py-8 md:pb-8">{children}</main>
    </div>
  )
}

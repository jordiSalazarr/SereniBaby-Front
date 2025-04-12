import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Serenibaby - Mejora el sueño de tus hijos",
  description: "Aplicación para ayudar a las madres a mejorar el sueño de sus hijos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans`}>
        {/* <AuthProvider> */}
          {children}
          {/* </AuthProvider> */}
      </body>
    </html>
  )
}


import './globals.css'
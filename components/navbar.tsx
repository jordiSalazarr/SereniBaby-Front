"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, ClipboardList, MessageCircle, Video, LayoutDashboard } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = () => {
    logout()
  }

  const navItems = [
    { name: "Plan", path: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Registro", path: "/dashboard/sleep-log", icon: <ClipboardList className="h-5 w-5" /> },
    { name: "Chat", path: "/dashboard/chatbot", icon: <MessageCircle className="h-5 w-5" /> },
    { name: "Programa", path: "/dashboard/videos", icon: <Video className="h-5 w-5" /> },
    { name: "Perfil", path: "/dashboard/profile", icon: <User className="h-5 w-5" /> },
  ]

  return (
    <>
      {/* Desktop Navigation Only */}
      <nav className="hidden border-b bg-white shadow-sm md:block">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative h-10 w-40">
                <Image
                  src="/images/serenibaby-logo.png"
                  alt="SereniBaby Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.path ? "bg-accent/10 text-accent" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
        <div className="grid h-16 grid-cols-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center ${
                pathname === item.path ? "text-accent" : "text-gray-500"
              }`}
            >
              <div className="flex h-6 w-6 items-center justify-center">{item.icon}</div>
              <span className="mt-1 text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Add padding to the bottom of the page to account for the fixed navigation */}
      <div className="h-16 md:hidden"></div>
    </>
  )
}

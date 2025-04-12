"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addChild, removeChild, type Child } from "@/lib/local-storage"
import { PlusCircle, Trash2, User } from "lucide-react"

export default function Profile() {
  const { user } = useAuth()
  const [children, setChildren] = useState<Child[]>([])
  const [newChildName, setNewChildName] = useState("")
  const [newChildBirthdate, setNewChildBirthdate] = useState("")
  const [loading, setLoading] = useState(false)
  const [isAddingChild, setIsAddingChild] = useState(false)

  useEffect(() => {
    if (user) {
      setChildren(user.children || [])
    }
  }, [user])

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      const newChild = addChild(user.id, {
        name: newChildName,
        birthdate: newChildBirthdate,
      })

      if (newChild) {
        setChildren([...children, newChild])
      }

      setNewChildName("")
      setNewChildBirthdate("")
      setIsAddingChild(false)
    } catch (error) {
      console.error("Error adding child:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveChild = async (childId: string) => {
    if (!user) return
    if (!confirm("¿Estás seguro de que quieres eliminar este perfil?")) return

    setLoading(true)
    try {
      const success = removeChild(user.id, childId)

      if (success) {
        setChildren(children.filter((child) => child.id !== childId))
      }
    } catch (error) {
      console.error("Error removing child:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Perfil de Usuario</h1>
        <p className="mt-2 text-gray-600">Gestiona la información de tus hijos y preferencias</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de Usuario</CardTitle>
          <CardDescription>Tu información de cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ""} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Perfiles de Niños</CardTitle>
            <CardDescription>Gestiona los perfiles de tus hijos para personalizar la experiencia</CardDescription>
          </div>
          {!isAddingChild && (
            <Button variant="outline" onClick={() => setIsAddingChild(true)} className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Añadir Niño
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isAddingChild && (
            <form onSubmit={handleAddChild} className="mb-6 space-y-4 rounded-lg border p-4">
              <div className="space-y-2">
                <Label htmlFor="childName">Nombre del niño</Label>
                <Input id="childName" value={newChildName} onChange={(e) => setNewChildName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="childBirthdate">Fecha de nacimiento</Label>
                <Input
                  id="childBirthdate"
                  type="date"
                  value={newChildBirthdate}
                  onChange={(e) => setNewChildBirthdate(e.target.value)}
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddingChild(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          )}

          {children.length === 0 && !isAddingChild ? (
            <div className="flex h-[100px] items-center justify-center">
              <p className="text-gray-500">No hay perfiles de niños. Añade uno para comenzar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {children.map((child) => (
                <div key={child.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-sm text-gray-500">{new Date(child.birthdate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveChild(child.id)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-accent to-accent-secondary">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h1 className="text-2xl font-semibold text-primary-foreground">Cargando SweetDreams...</h1>
      </div>
    </div>
  )
}

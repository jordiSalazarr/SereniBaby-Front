import AuthPage from "@/components/auth-page"

export default function Home() {
  // In a real app, we would check server-side if the user is authenticated
  // For now, we'll just show the auth page
  return <AuthPage />
}

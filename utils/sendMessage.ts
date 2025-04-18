// utils/sendMessage.ts
export async function sendMessage(message: string): Promise<string | null> {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
  
      const data = await res.json()
      return data.reply
    } catch (err) {
      console.error('Error enviando mensaje:', err)
      return null
    }
  }
  
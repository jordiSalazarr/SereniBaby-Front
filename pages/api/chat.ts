// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next'
const sysPrompt = "Eres SonIA, una asistente virtual empática y comprensiva diseñada para ayudar a madres que desean mejorar el descanso propio y de sus hijos durante los primeros años de vida. Tu objetivo es ofrecer apoyo emocional y consejos prácticos basados en conocimiento actualizado sobre el sueño infantil, rutinas saludables, y el bienestar físico y emocional de la madre. Respondes con empatía, sin juicios, y adaptas tus sugerencias al contexto de cada madre, respetando sus decisiones de crianza."
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { message } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mensaje inválido' })
  }

  try {

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: sysPrompt,
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return res.status(500).json({ error: error.error.message })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('Error al llamar a OpenAI:', err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default handler

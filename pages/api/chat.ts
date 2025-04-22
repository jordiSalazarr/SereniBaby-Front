// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next'
const sysPrompt =`Prompt



Hola SonIA, mi nombre es Laura, mi peque se llama Carlitos, tiene 18 meses, la fecha de hoy es 18 de abril de 2025.
Me has recomendado que haga 2 siestas que deben hacerse en los siguientes horarios: primera siesta a las 9:00h y duración recomendada de 1,5 horas, segunda siesta a las 13:00h y duración recomendada de 2h
Me has recomendado que mi peque se despierte a las 7:30h, y se duerma por la noche a las 19:00h;
Me has recomendado que el tiempo máximo que puede estar despierto sin sobrecansarse es de 4h;
Te he dicho que mi peque tiene 3 tomas nocturnas de leche, y mi objetivo es eliminar 2 de las tomas nocturnas;
Mi peque se apoya en mis brazos como muletilla para poder dormirse;
Actualmente mi peque duerme en mi habitación, y mi objetivo es que duerma en su habitación.
En esta fecha 16/04/2025 mi peque tuvo 3 despertares por la noche, incluyendo 3 tomas de leche y se ha despertado a las 6:00h .
Te resumo las horas de las siestas y su duración: Siesta 1 8:30h con duración3 0 minutos , Siesta 2 13:00h con duración 1h, y esta noche se ha dormido a las 19h.
En esta fecha 17/04/2025 mi peque tuvo 2 despertares por la noche, incluyendo 1 tomas de leche y se ha despertado a las 7:00h .
Te resumo las horas de las siestas y su duración: Siesta 1 9:30h con duración3 0 minutos , Siesta 2 13:30h con duración 1,5h, y esta noche se ha dormido a las 19h.
ES MUY IMPORTANTE QUE RESPONDAS EN FORMATO MARKDOWN SIEMPRE. Genera listas en markdown si lo ves necesario.
MUY IMPORTANTE QUE TE LIMITES A DAR INFORMACION EN RELACION A LA PREGUNTA DEL USUARIO, NADA MÁS.
`
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
        model: 'gpt-4o',
        temperature: 0,
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

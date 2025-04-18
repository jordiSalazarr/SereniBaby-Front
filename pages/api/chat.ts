// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next'
const sysPrompt = `Actúas como un asistente de conciliación del sueño para madres con hijos pequeños. Tu tarea es analizar la información del perfil y los hábitos de sueño del niño, junto con un registro detallado del sueño, para ofrecer consejos personalizados y empáticos a la madre. Tu tono debe ser comprensivo, alentador y claro. 🧍‍♀️Madre: Laura  
🧒Hijo: Carlitos  
👶Edad de Carlitos: 2 años y 4 meses

📋 Perfil de Carlitos:
- Es un niño activo y curioso, le cuesta desconectar por la noche.
- Está en transición de dejar la siesta de la tarde.
- Se despierta fácilmente con ruidos.
- Usa un chupete para dormir.
- Tiene una rutina antes de dormir que incluye baño, cuento y música suave.
- Duerme en su propia habitación desde los 18 meses.
- Últimamente ha empezado a tener despertares nocturnos frecuentes (2-3 veces por noche).

🕰️ Hábitos de sueño actuales:
- Hora habitual de irse a la cama: 21:00
- Hora habitual de despertarse: 07:30
- Tarda en dormirse: entre 30 y 45 minutos
- A veces se duerme en brazos y luego se lo deja en la cuna
- Siesta: 1 o 2 días por semana, entre las 13:30 y las 14:15 (no siempre la quiere)

📆 Registro de sueño del último mes (resumen):
- Se ha despertado en medio de la noche 21 días de los últimos 30
- En 12 de esos días, le costó más de 20 minutos volver a dormirse
- Hubo 3 días en los que no quiso dormir siesta y estuvo irritable por la tarde
- Se ha dormido más rápido (menos de 20 min) los días que no tuvo pantalla después de las 18:00
- Los fines de semana se acuesta un poco más tarde (21:30–22:00), y al día siguiente está más inquieto por la mañana

🎯 Objetivo de Laura:
Laura quiere que Carlitos tenga un descanso más estable y reparador, con menos despertares nocturnos y menor tiempo para conciliar el sueño. También desea saber si mantener o eliminar completamente la siesta ayudaría.

🔍 Instrucciones:
Con esta información, genera un análisis personalizado del patrón de sueño de Carlitos y ofrece recomendaciones prácticas y accesibles que Laura pueda aplicar en su día a día. Prioriza los consejos que tengan más impacto, y justifícalos con base en el comportamiento actual del niño.`
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

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Clock, Heart, AlertCircle, Lightbulb } from "lucide-react"

export default function SelfSoothingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Aprender a Dormir Solo</h1>
        <p className="mt-2 text-gray-600">
          Estrategias efectivas para ayudar a tu hijo a desarrollar la habilidad de conciliar el sueño de forma
          independiente
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>¿Qué significa dormir solo?</CardTitle>
          <CardDescription>Entendiendo la autorregulación y el sueño independiente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Dormir solo o "auto-calmarse" se refiere a la capacidad de un niño para tranquilizarse y quedarse dormido
            sin intervención externa (como mecerlo, darle el pecho o biberón hasta dormirse, etc.). Esta habilidad es
            crucial para que los niños puedan volver a dormirse cuando se despiertan naturalmente durante la noche.
          </p>
          <p>
            Es importante entender que todos los niños (y adultos) se despiertan varias veces durante la noche entre
            ciclos de sueño. La diferencia es que quienes saben auto-calmarse pueden volver a dormirse sin ayuda,
            mientras que quienes dependen de intervenciones externas necesitarán esa misma ayuda cada vez que se
            despierten.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            ¿Cuándo empezar?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            No existe un momento "perfecto" para enseñar a tu hijo a dormir solo, pero hay algunas consideraciones
            importantes:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold text-primary">Desarrollo:</h3>
              <ul className="ml-6 list-disc space-y-1">
                <li>La mayoría de los bebés están neurológicamente preparados alrededor de los 4-6 meses</li>
                <li>Antes de los 4 meses, los bebés se benefician de la respuesta rápida a sus necesidades</li>
                <li>Después de los 6 meses, los hábitos de sueño comienzan a consolidarse</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-secondary">Señales de preparación:</h3>
              <ul className="ml-6 list-disc space-y-1">
                <li>Tu bebé puede calmarse brevemente por sí mismo (chupándose el pulgar, etc.)</li>
                <li>Muestra patrones de sueño más predecibles</li>
                <li>Está ganando peso adecuadamente y no tiene problemas médicos</li>
                <li>Puede pasar períodos más largos sin alimentarse durante la noche</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-orange-500">Consideraciones familiares:</h3>
              <ul className="ml-6 list-disc space-y-1">
                <li>Los padres están listos emocionalmente para el proceso</li>
                <li>Hay tiempo y energía para ser consistente (evitar períodos de grandes cambios)</li>
                <li>Todos los cuidadores están de acuerdo con el enfoque</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-secondary" />
              Preparación para el éxito
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Antes de comenzar cualquier método para enseñar a tu hijo a dormir solo, asegúrate de tener estas bases
              cubiertas:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <span className="font-medium">Ambiente de sueño óptimo:</span> Habitación oscura, temperatura adecuada,
                ruido blanco si es necesario.
              </li>
              <li>
                <span className="font-medium">Rutina consistente:</span> Establece una rutina relajante y predecible
                antes de dormir.
              </li>
              <li>
                <span className="font-medium">Horarios adecuados:</span> Respeta las ventanas de sueño según la edad
                para evitar que esté sobreestimulado o demasiado cansado.
              </li>
              <li>
                <span className="font-medium">Alimentación adecuada:</span> Asegúrate de que tu hijo esté recibiendo
                suficiente alimentación durante el día.
              </li>
              <li>
                <span className="font-medium">Descartar problemas médicos:</span> Consulta con el pediatra si sospechas
                que hay reflujo, alergias u otros problemas que puedan afectar el sueño.
              </li>
              <li>
                <span className="font-medium">Plan consistente:</span> Asegúrate de que todos los cuidadores estén de
                acuerdo y sigan el mismo enfoque.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Expectativas realistas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Es importante tener expectativas realistas sobre el proceso:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <span className="font-medium">No es instantáneo:</span> El aprendizaje lleva tiempo, generalmente de 1 a
                2 semanas para ver mejoras significativas.
              </li>
              <li>
                <span className="font-medium">Habrá retrocesos:</span> Enfermedades, dentición, saltos de desarrollo o
                cambios en la rutina pueden causar retrocesos temporales.
              </li>
              <li>
                <span className="font-medium">Cada niño es diferente:</span> Algunos aprenden rápidamente, otros
                necesitan más tiempo y apoyo.
              </li>
              <li>
                <span className="font-medium">El llanto es posible:</span> La mayoría de los métodos implican algún
                nivel de protesta, pero no significa que tu hijo esté siendo ignorado o desatendido.
              </li>
              <li>
                <span className="font-medium">No es "todo o nada":</span> Puedes adaptar los métodos según las
                necesidades de tu familia y tu hijo.
              </li>
              <li>
                <span className="font-medium">El objetivo es la independencia:</span> Recuerda que estás enseñando una
                habilidad valiosa para toda la vida.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Métodos graduales para enseñar a dormir solo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Existen varios métodos para ayudar a tu hijo a aprender a dormir solo. Estos enfoques graduales suelen ser
            más suaves y pueden adaptarse a diferentes temperamentos y situaciones familiares:
          </p>

          <div>
            <h3 className="mb-2 font-semibold text-primary">1. Método de extinción gradual (Ferber modificado)</h3>
            <p className="mb-2">
              Este método implica acostar a tu hijo somnoliento pero despierto y salir de la habitación. Si llora,
              esperas intervalos progresivamente más largos antes de entrar a reconfortarlo brevemente sin sacarlo de la
              cuna/cama.
            </p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Primer día: Intervalos de 3, 5, 7 minutos...</li>
              <li>Segundo día: Intervalos de 5, 7, 10 minutos...</li>
              <li>Tercer día: Intervalos de 7, 10, 12 minutos...</li>
              <li>Cuando entres, reconforta brevemente (1-2 minutos) sin sacar al niño de la cuna</li>
              <li>Sé consistente y mantén las visitas breves y calmadas</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-secondary">
              2. Método de la silla (desvanecimiento de la presencia)
            </h3>
            <p className="mb-2">Este método implica una retirada gradual de tu presencia física de la habitación:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Primer paso: Siéntate junto a la cuna/cama hasta que tu hijo se duerma</li>
              <li>Cada pocos días, mueve la silla un poco más lejos de la cuna/cama</li>
              <li>Eventualmente, la silla estará fuera de la habitación</li>
              <li>No interactúes mucho, solo ofrece presencia tranquilizadora</li>
              <li>Proceso más lento pero con menos llanto</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-orange-500">3. Método del desvanecimiento de rutina</h3>
            <p className="mb-2">Este enfoque implica cambiar gradualmente las asociaciones de sueño:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Identifica la asociación actual (mecer, dar pecho hasta dormir, etc.)</li>
              <li>Reduce gradualmente esa asociación (mecer menos tiempo cada noche)</li>
              <li>Introduce nuevas asociaciones positivas (objeto de transición, canción)</li>
              <li>Eventualmente, acuesta a tu hijo somnoliento pero despierto</li>
              <li>Proceso muy gradual pero suave</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-green-500">4. Método "pick-up/put-down" (levantar/acostar)</h3>
            <p className="mb-2">Este método ofrece consuelo inmediato pero fomenta la independencia:</p>
            <ul className="ml-6 list-disc space-y-1">
              <li>Acuesta a tu hijo somnoliento pero despierto</li>
              <li>Si llora, levántalo para calmarlo</li>
              <li>Una vez calmado (pero aún despierto), vuélvelo a acostar</li>
              <li>Repite tantas veces como sea necesario</li>
              <li>Puede ser agotador pero ofrece mucho apoyo</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-green-500" />
            Implementación paso a paso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Independientemente del método que elijas, estos pasos te ayudarán a implementarlo con éxito:</p>
          <ol className="ml-6 list-decimal space-y-2">
            <li>
              <span className="font-medium">Elige el momento adecuado:</span> Asegúrate de tener al menos 1-2 semanas
              sin grandes cambios o viajes para ser consistente.
            </li>
            <li>
              <span className="font-medium">Prepara el ambiente:</span> Optimiza la habitación para el sueño (oscuridad,
              temperatura, ruido blanco si es neces la habitación para el sueño (oscuridad, temperatura, ruido blanco si
              es necesario).
            </li>
            <li>
              <span className="font-medium">Establece una rutina sólida:</span> Crea una secuencia predecible de
              actividades relajantes antes de dormir.
            </li>
            <li>
              <span className="font-medium">Comunica el cambio:</span> Para niños mayores, explícales de manera positiva
              que aprenderán a dormir solitos como los "niños grandes".
            </li>
            <li>
              <span className="font-medium">Sé consistente:</span> Aplica el método elegido de la misma manera cada
              noche y para cada despertar.
            </li>
            <li>
              <span className="font-medium">Mantén la calma:</span> Tu tranquilidad ayudará a tu hijo a sentirse seguro
              durante el proceso.
            </li>
            <li>
              <span className="font-medium">Celebra los logros:</span> Reconoce y celebra los avances, por pequeños que
              sean.
            </li>
            <li>
              <span className="font-medium">Ajusta según sea necesario:</span> Si después de una semana no ves progreso,
              considera modificar tu enfoque.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-500" />
            Consejos adicionales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <span className="font-medium">Objeto de transición:</span> Para niños mayores de 12 meses, un peluche o
              mantita especial puede proporcionar confort.
            </li>
            <li>
              <span className="font-medium">Cuida de ti mismo:</span> Este proceso puede ser emocionalmente agotador.
              Asegúrate de tener apoyo y turnarte con tu pareja si es posible.
            </li>
            <li>
              <span className="font-medium">Siestas primero:</span> Considera trabajar primero en las siestas o primero
              en el sueño nocturno, pero no ambos simultáneamente.
            </li>
            <li>
              <span className="font-medium">Sé paciente con los retrocesos:</span> Durante enfermedades, dentición o
              saltos de desarrollo, es normal ofrecer más apoyo y luego volver a la independencia.
            </li>
            <li>
              <span className="font-medium">Confía en tu intuición:</span> Tú conoces mejor a tu hijo. Si un método no
              parece adecuado, está bien probar otro enfoque.
            </li>
            <li>
              <span className="font-medium">Busca apoyo profesional:</span> Si después de intentarlo consistentemente no
              ves mejoras, considera consultar con un especialista en sueño infantil.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

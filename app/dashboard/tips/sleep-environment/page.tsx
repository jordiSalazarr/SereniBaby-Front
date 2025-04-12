"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThermometerSun, Moon, Volume2, Lightbulb, ShieldCheck } from "lucide-react"

export default function SleepEnvironmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ambiente de Sueño Ideal</h1>
        <p className="mt-2 text-gray-600">Crea el espacio perfecto para que tu hijo duerma mejor y por más tiempo</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>¿Por qué es importante el ambiente de sueño?</CardTitle>
          <CardDescription>
            El entorno donde duerme tu hijo puede afectar significativamente la calidad y duración de su sueño
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Un ambiente de sueño adecuado ayuda a que el cerebro de tu hijo reconozca que es hora de dormir, facilitando
            la transición del estado de vigilia al sueño. Un espacio bien diseñado puede reducir los despertares
            nocturnos y promover ciclos de sueño más largos y reparadores.
          </p>
          <p>
            Los niños son especialmente sensibles a los estímulos ambientales. Factores como la luz, el ruido, la
            temperatura y la comodidad pueden tener un impacto significativo en su capacidad para conciliar el sueño y
            permanecer dormidos.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="mb-2 rounded-full bg-primary/10 p-2 w-fit">
              <ThermometerSun className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Temperatura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              La temperatura ideal para el sueño infantil está entre 18-21°C (65-70°F). Un ambiente demasiado caliente o
              frío puede causar despertares e incomodidad.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recomendaciones:</h3>
              <ul className="ml-6 list-disc text-sm space-y-1">
                <li>Usa un termómetro de habitación para monitorear la temperatura</li>
                <li>Ajusta la ropa de dormir según la temperatura (TOG apropiado)</li>
                <li>Evita sobrecalentar la habitación en invierno</li>
                <li>Considera un ventilador en verano (no apuntando directamente al niño)</li>
                <li>Mantén la cuna/cama alejada de radiadores o corrientes de aire</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="mb-2 rounded-full bg-secondary/10 p-2 w-fit">
              <Moon className="h-5 w-5 text-secondary" />
            </div>
            <CardTitle className="text-lg">Oscuridad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              La oscuridad estimula la producción de melatonina, la hormona del sueño. Una habitación oscura ayuda a que
              tu hijo se duerma más rápido y tenga menos despertares.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recomendaciones:</h3>
              <ul className="ml-6 list-disc text-sm space-y-1">
                <li>Usa cortinas opacas o blackout para bloquear la luz exterior</li>
                <li>Elimina o cubre luces LED de monitores o dispositivos</li>
                <li>Si es necesaria una luz nocturna, usa una de color rojo o ámbar tenue</li>
                <li>Coloca la luz nocturna lejos de la cuna/cama</li>
                <li>Considera más oscuridad para las siestas diurnas</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="mb-2 rounded-full bg-orange-500/10 p-2 w-fit">
              <Volume2 className="h-5 w-5 text-orange-500" />
            </div>
            <CardTitle className="text-lg">Sonido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Un ambiente silencioso o con ruido blanco constante puede ayudar a tu hijo a dormir mejor, bloqueando
              sonidos que podrían despertarlo.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recomendaciones:</h3>
              <ul className="ml-6 list-disc text-sm space-y-1">
                <li>Usa una máquina de ruido blanco (50-60 dB, a 2 metros de distancia)</li>
                <li>Considera sonidos como lluvia suave, ventilador o estática</li>
                <li>Mantén el ruido blanco durante toda la noche para evitar despertares</li>
                <li>Aísla ruidos externos (puertas que chirrían, televisión)</li>
                <li>Evita música con melodía o letras que puedan estimular</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="mb-2 rounded-full bg-green-500/10 p-2 w-fit">
              <ShieldCheck className="h-5 w-5 text-green-500" />
            </div>
            <CardTitle className="text-lg">Seguridad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Un espacio de sueño seguro no solo protege a tu hijo, sino que también te da tranquilidad, lo que
              contribuye a un mejor descanso para todos.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recomendaciones:</h3>
              <ul className="ml-6 list-disc text-sm space-y-1">
                <li>Superficie firme y plana para dormir</li>
                <li>Sin almohadas, mantas sueltas o peluches en la cuna (menores de 12 meses)</li>
                <li>Cuna/cama alejada de cordones de persianas o cortinas</li>
                <li>Muebles asegurados a la pared para evitar vuelcos</li>
                <li>Monitor de bebé bien colocado (cables fuera de alcance)</li>
                <li>Detector de humo funcional en o cerca de la habitación</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="mb-2 rounded-full bg-blue-500/10 p-2 w-fit">
              <Lightbulb className="h-5 w-5 text-blue-500" />
            </div>
            <CardTitle className="text-lg">Consistencia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Mantener un ambiente de sueño consistente ayuda a que el cerebro de tu hijo asocie ese espacio con el
              descanso, facilitando la transición al sueño.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recomendaciones:</h3>
              <ul className="ml-6 list-disc text-sm space-y-1">
                <li>Usa el mismo espacio para dormir siempre que sea posible</li>
                <li>Mantén elementos consistentes (ruido blanco, oscuridad) incluso al viajar</li>
                <li>Considera un objeto de transición para niños mayores de 12 meses</li>
                <li>Usa señales sensoriales consistentes (mismo aroma, tacto)</li>
                <li>Evita cambios frecuentes en la disposición de la habitación</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="mb-2 rounded-full bg-purple-500/10 p-2 w-fit">
              <Moon className="h-5 w-5 text-purple-500" />
            </div>
            <CardTitle className="text-lg">Comodidad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Un espacio cómodo y acogedor invita al descanso y ayuda a que tu hijo se sienta seguro y relajado.
            </p>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recomendaciones:</h3>
              <ul className="ml-6 list-disc text-sm space-y-1">
                <li>Colchón firme pero cómodo</li>
                <li>Sábanas suaves y limpias</li>
                <li>Ropa de dormir apropiada para la temperatura</li>
                <li>Ambiente libre de alérgenos (limpieza regular)</li>
                <li>Considera la humedad (40-60% es ideal)</li>
                <li>Para niños mayores, involúcralos en la elección de elementos de su espacio</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Adaptando el ambiente según la edad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold text-primary">Recién nacidos (0-3 meses)</h3>
              <ul className="ml-6 list-disc space-y-1">
                <li>Prioriza la seguridad: superficie firme, sin objetos sueltos</li>
                <li>Ruido blanco puede simular el ambiente del útero</li>
                <li>Considera un swaddle o manta de envolver</li>
                <li>Temperatura ligeramente más cálida (20-22°C)</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-secondary">Bebés (4-12 meses)</h3>
              <ul className="ml-6 list-disc space-y-1">
                <li>Mantén la seguridad como prioridad</li>
                <li>Oscuridad más pronunciada para ayudar con la consolidación del sueño</li>
                <li>Ruido blanco consistente</li>
                <li>Considera un saco de dormir apropiado</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-orange-500">Niños pequeños (1-3 años)</h3>
              <ul className="ml-6 list-disc space-y-1">
                <li>Transición segura a cama (si es apropiado)</li>
                <li>Puedes introducir una almohada pequeña y manta ligera</li>
                <li>Objeto de seguridad o transición (peluche, mantita)</li>
                <li>Mantén la consistencia en rutinas y ambiente</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-green-500">Preescolares (3-5 años)</h3>
              <ul className="ml-6 list-disc space-y-1">
                <li>Involúcralos en la creación de su espacio de sueño</li>
                <li>Luz nocturna si tienen miedo a la oscuridad</li>
                <li>Mantén dispositivos electrónicos fuera de la habitación</li>
                <li>Considera sus preferencias pero mantén los elementos clave (oscuridad, temperatura adecuada)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Consejos adicionales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <span className="font-medium">Separación de espacios:</span> Si es posible, mantén el área de juego
              separada del área de sueño para fortalecer la asociación entre la cama/cuna y el dormir.
            </li>
            <li>
              <span className="font-medium">Colores:</span> Opta por colores relajantes en las paredes (azules, verdes o
              neutros suaves) en lugar de colores brillantes o estimulantes.
            </li>
            <li>
              <span className="font-medium">Aromas:</span> Para niños mayores, considera aromas relajantes como lavanda
              (asegúrate de que no sean alérgenos).
            </li>
            <li>
              <span className="font-medium">Viajes:</span> Lleva elementos clave del ambiente de sueño cuando viajes
              (ruido blanco portátil, saco de dormir familiar, objeto de transición).
            </li>
            <li>
              <span className="font-medium">Consistencia entre cuidadores:</span> Asegúrate de que todos los cuidadores
              conozcan y mantengan las condiciones óptimas de sueño.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

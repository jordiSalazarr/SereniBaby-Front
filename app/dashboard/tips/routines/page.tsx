"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MoonIcon, Sun, Bath, Book, Music } from "lucide-react"

export default function RoutinesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rutinas para un Descanso Reparador</h1>
        <p className="mt-2 text-gray-600">
          Establece rutinas efectivas que ayuden a tu hijo a tener un sueño de calidad
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>¿Por qué son importantes las rutinas?</CardTitle>
          <CardDescription>Las rutinas ayudan a preparar el cuerpo y la mente de tu hijo para el sueño</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Establecer una rutina constante antes de dormir es una de las estrategias más efectivas para mejorar el
            sueño infantil. Las rutinas proporcionan previsibilidad y seguridad, ayudando a que el cerebro de tu hijo
            libere melatonina, la hormona del sueño.
          </p>
          <p>
            Una buena rutina debe ser relajante, predecible y agradable tanto para ti como para tu hijo. Debe realizarse
            en el mismo orden cada noche, aproximadamente a la misma hora, y durar entre 20 y 45 minutos.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              Rutina de siesta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Las siestas también se benefician de una rutina, aunque más corta que la nocturna. Una rutina de siesta
              efectiva podría incluir:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Revisar señales de cansancio (frotarse los ojos, bostezos, menor actividad)</li>
              <li>Cerrar cortinas y reducir la estimulación</li>
              <li>Cambiar el pañal y ponerse ropa cómoda</li>
              <li>Leer un libro corto o cantar una canción suave</li>
              <li>Usar frases consistentes como "es hora de la siesta"</li>
            </ul>
            <p className="mt-4 font-medium">Duración recomendada: 10-15 minutos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MoonIcon className="h-5 w-5 text-secondary" />
              Rutina nocturna
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>La rutina nocturna debe ser más extensa y relajante. Una rutina nocturna efectiva podría incluir:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Baño tibio (no caliente, para no estimular demasiado)</li>
              <li>Cambio a ropa de dormir</li>
              <li>Cepillado de dientes</li>
              <li>Ambiente tranquilo (luz tenue, ruido reducido)</li>
              <li>Lectura de cuentos</li>
              <li>Canción de cuna o nana</li>
              <li>Frases de despedida consistentes</li>
            </ul>
            <p className="mt-4 font-medium">Duración recomendada: 30-45 minutos</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="mt-8 text-2xl font-bold">Elementos clave de una rutina efectiva</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="mb-2 rounded-full bg-primary/10 p-2 w-fit">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Consistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Mantén el mismo orden y horario cada día. La previsibilidad ayuda a que el cerebro de tu hijo se prepare
              para el sueño.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="mb-2 rounded-full bg-secondary/10 p-2 w-fit">
              <Bath className="h-5 w-5 text-secondary" />
            </div>
            <CardTitle className="text-lg">Actividades relajantes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Incluye actividades tranquilas como un baño tibio, lectura o canciones suaves. Evita pantallas y juegos
              estimulantes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="mb-2 rounded-full bg-orange-500/10 p-2 w-fit">
              <Book className="h-5 w-5 text-orange-500" />
            </div>
            <CardTitle className="text-lg">Conexión emocional</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Aprovecha este momento para conectar con tu hijo. La seguridad emocional favorece un mejor sueño.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ejemplo de rutina por edades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold text-primary">Bebés (0-12 meses)</h3>
              <ol className="ml-6 list-decimal space-y-2">
                <li>Baño tibio (opcional, no todos los días)</li>
                <li>Masaje suave con loción</li>
                <li>Cambio de pañal y pijama</li>
                <li>Alimentación en un ambiente tranquilo</li>
                <li>Canción de cuna o nana</li>
                <li>Acostar cuando esté somnoliento pero despierto</li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-secondary">Niños pequeños (1-3 años)</h3>
              <ol className="ml-6 list-decimal space-y-2">
                <li>Baño</li>
                <li>Cepillado de dientes</li>
                <li>Cambio a pijama</li>
                <li>Lectura de 1-2 cuentos</li>
                <li>Conversación tranquila sobre el día</li>
                <li>Canción o nana</li>
                <li>Despedida consistente ("Buenas noches, te quiero")</li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-orange-500">Preescolares (3-5 años)</h3>
              <ol className="ml-6 list-decimal space-y-2">
                <li>Baño</li>
                <li>Cepillado de dientes</li>
                <li>Cambio a pijama</li>
                <li>Tiempo de lectura (pueden elegir 1-2 libros)</li>
                <li>Conversación sobre cosas positivas del día</li>
                <li>Técnica de relajación simple (respiración)</li>
                <li>Despedida y frases de afirmación</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-green-500" />
            Consejos adicionales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <span className="font-medium">Sé flexible pero consistente:</span> Adapta la rutina según sea necesario
              (viajes, enfermedad), pero mantén los elementos clave.
            </li>
            <li>
              <span className="font-medium">Anticipa los cambios:</span> Si necesitas modificar la rutina, explícaselo a
              tu hijo con anticipación.
            </li>
            <li>
              <span className="font-medium">Involucra a tu hijo:</span> Los niños mayores pueden ayudar a crear su
              rutina, dándoles sensación de control.
            </li>
            <li>
              <span className="font-medium">Sé paciente:</span> Establecer una rutina efectiva puede tomar tiempo. La
              consistencia es clave.
            </li>
            <li>
              <span className="font-medium">Ajusta según la edad:</span> Las rutinas deben evolucionar a medida que tu
              hijo crece.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

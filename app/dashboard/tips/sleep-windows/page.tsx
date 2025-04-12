"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, AlertCircle, Sun, Coffee } from "lucide-react"

export default function SleepWindowsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ventanas de Sueño</h1>
        <p className="mt-2 text-gray-600">
          Aprende sobre los intervalos óptimos de vigilia entre siestas según la edad de tu hijo
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>¿Qué son las ventanas de sueño?</CardTitle>
          <CardDescription>
            Períodos óptimos de tiempo que un niño puede estar despierto entre siestas o antes de dormir
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Las ventanas de sueño son los intervalos de tiempo que un niño puede permanecer despierto cómodamente antes
            de necesitar dormir nuevamente. Respetar estas ventanas es crucial para evitar que tu hijo se sobreestimule
            o se canse demasiado, lo que puede dificultar que concilie el sueño.
          </p>
          <p>
            Cuando un niño permanece despierto más allá de su ventana de sueño óptima, su cuerpo libera hormonas del
            estrés como el cortisol y la adrenalina, que pueden hacer que sea más difícil para ellos calmarse y quedarse
            dormidos.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Ventanas de sueño por edad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Edad</TableHead>
                <TableHead>Ventana de sueño</TableHead>
                <TableHead>Número de siestas</TableHead>
                <TableHead>Notas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">0-4 semanas</TableCell>
                <TableCell>45-60 minutos</TableCell>
                <TableCell>4-8 siestas</TableCell>
                <TableCell>Muy cortas, ciclos de sueño inmaduro</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">1-2 meses</TableCell>
                <TableCell>45-90 minutos</TableCell>
                <TableCell>4-5 siestas</TableCell>
                <TableCell>Patrones de sueño aún muy variables</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2-3 meses</TableCell>
                <TableCell>1-1.5 horas</TableCell>
                <TableCell>4-5 siestas</TableCell>
                <TableCell>Comienza a desarrollar ritmos circadianos</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">3-4 meses</TableCell>
                <TableCell>1.5-2 horas</TableCell>
                <TableCell>4 siestas</TableCell>
                <TableCell>Más alerta, observar señales de cansancio</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">5-6 meses</TableCell>
                <TableCell>2-2.5 horas</TableCell>
                <TableCell>3 siestas</TableCell>
                <TableCell>Transición a 3 siestas más estructuradas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">7-9 meses</TableCell>
                <TableCell>2.5-3 horas</TableCell>
                <TableCell>2-3 siestas</TableCell>
                <TableCell>Transición a 2 siestas más largas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">10-12 meses</TableCell>
                <TableCell>3-3.5 horas</TableCell>
                <TableCell>2 siestas</TableCell>
                <TableCell>Siestas más consistentes mañana y tarde</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">13-15 meses</TableCell>
                <TableCell>3-3.5 horas</TableCell>
                <TableCell>2 siestas</TableCell>
                <TableCell>Siesta de la mañana más corta</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">16-18 meses</TableCell>
                <TableCell>3.5-4 horas</TableCell>
                <TableCell>1-2 siestas</TableCell>
                <TableCell>Posible transición a una siesta</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">19-24 meses</TableCell>
                <TableCell>4-5 horas</TableCell>
                <TableCell>1 siesta</TableCell>
                <TableCell>Consolidación a una siesta después del almuerzo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">2-3 años</TableCell>
                <TableCell>5-6 horas</TableCell>
                <TableCell>1 siesta</TableCell>
                <TableCell>Siesta más corta, algunos niños la abandonan</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">3-5 años</TableCell>
                <TableCell>6-7 horas</TableCell>
                <TableCell>0-1 siesta</TableCell>
                <TableCell>Muchos niños ya no necesitan siesta</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-secondary" />
              Señales de cansancio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Observar las señales de cansancio de tu hijo es tan importante como conocer las ventanas de sueño. Estas
              señales indican que tu hijo está listo para dormir:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-primary">Señales tempranas:</h3>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Frotarse los ojos</li>
                  <li>Jalarse las orejas</li>
                  <li>Bostezos</li>
                  <li>Mirada perdida</li>
                  <li>Menor actividad</li>
                  <li>Menos interés en juguetes/entorno</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-secondary">Señales tardías:</h3>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Irritabilidad</li>
                  <li>Llanto</li>
                  <li>Hiperactividad</li>
                  <li>Dificultad para concentrarse</li>
                  <li>Aferrarse a los padres</li>
                </ul>
              </div>
            </div>
            <p className="mt-2 font-medium text-orange-500">
              Es mejor actuar con las señales tempranas. Si esperas hasta las señales tardías, tu hijo puede estar
              sobreestimulado y será más difícil que se duerma.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-orange-500" />
              Cómo usar las ventanas de sueño
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Las ventanas de sueño son una guía, no reglas estrictas. Cada niño es único y puede necesitar ajustes.
              Aquí hay algunos consejos para aplicarlas:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <span className="font-medium">Observa a tu hijo:</span> Presta atención a sus señales de cansancio y
                ajusta las ventanas según sea necesario.
              </li>
              <li>
                <span className="font-medium">Lleva un registro:</span> Anota cuándo tu hijo muestra señales de
                cansancio para identificar sus ventanas óptimas.
              </li>
              <li>
                <span className="font-medium">Sé consistente:</span> Intenta mantener horarios regulares para ayudar al
                reloj interno de tu hijo.
              </li>
              <li>
                <span className="font-medium">Anticipa:</span> Comienza la rutina de sueño antes de que se cierre la
                ventana para evitar la sobreestimulación.
              </li>
              <li>
                <span className="font-medium">Ajusta según el día:</span> Las ventanas pueden acortarse si tu hijo no
                durmió bien la noche anterior o tuvo un día muy activo.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-green-500" />
            Consejos adicionales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <span className="font-medium">Transiciones entre siestas:</span> A medida que tu hijo crece y reduce el
              número de siestas, las ventanas de sueño se alargarán. Este proceso puede ser desafiante y requerir
              ajustes.
            </li>
            <li>
              <span className="font-medium">Días especiales:</span> En días de viaje o eventos especiales, es posible
              que debas ser más flexible, pero intenta volver a la rutina lo antes posible.
            </li>
            <li>
              <span className="font-medium">Cambios estacionales:</span> La luz natural afecta los ritmos circadianos.
              Puede que necesites ajustar las ventanas de sueño según la estación del año.
            </li>
            <li>
              <span className="font-medium">Desarrollo:</span> Los saltos de desarrollo, la dentición y las enfermedades
              pueden afectar temporalmente las ventanas de sueño. Sé paciente y flexible durante estos períodos.
            </li>
            <li>
              <span className="font-medium">Temperamento:</span> Algunos niños son más sensibles a la sobreestimulación
              y pueden necesitar ventanas de sueño más cortas que el promedio.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

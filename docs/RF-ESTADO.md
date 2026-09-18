# Renzo y Franco — estado real del sistema

Actualizado: **18/09/2026**.

Este archivo vive en el repositorio a propósito. El traspaso anterior estaba en
la máquina del dueño y ninguna sesión de trabajo podía leerlo, así que se perdía
medio turno reconstruyendo contexto. Acá no.

**Regla de lectura:** lo que dice *probado* fue verificado contra el sistema
real. Lo que dice *preparado* existe pero nunca recibió un dato de verdad. La
diferencia importa más que el detalle técnico.

---

## Qué es esto

Sistema comercial de Instagram para **@renzoyfranco.viajes** (agencia Alas
Turismo):

```
comentario → DM → IA califica → planilla → vendedores de Franco → cierre humano
```

Alcance: **sólo esa cuenta**. Quedan afuera Caminantes, las cuentas personales
de Renzo, TikTok y Facebook.

## Estado por pieza

| Pieza | Estado |
| --- | --- |
| Inbox bidireccional Instagram ↔ SaleSmartly | **Probado** |
| IA respondiendo DMs reales | **Probado** el 17/09 |
| Base de conocimiento | **Auditada**, sin restos de promociones vencidas |
| Prompt del agente | **Publicado**, con una corrección verificada |
| Transferencia a humano | Funciona, pero **cae en cola desatendida** |
| Puente a la planilla | **Desplegado y probado a mano**: escribió la fila 6 el 18/09 |
| Plugin de HelpKnow | **Configurado y conectado al agente** 16103 |
| Prueba de punta a punta | **Falló el 18/09 y está corregida, sin reprobar** |
| Flujo de comentarios nuevo | **Nunca se ejecutó** |

---

## Lo que se probó el 17/09, con evidencia

La IA atendió su primer chat real desde `@rafacanevaro` (ID 1384513880563214).

**Precio de México.** Dio USD 2.900 por persona, sin usar la promoción vencida
de 2.700 ni las urgencias viejas ("últimos 2 lugares", "Black Friday") que
siguen estando en el material comercial de origen.

**Tarifa en triple.** Ante una consulta por 3 adultos, **se negó a calcular** y
escaló: el precio es base doble y la tarifa en triple no está definida.
Multiplicar habría sido inventar una tarifa.

**Un defecto real, corregido.** Para 2 adultos dijo *"suma USD 5.800, siempre
por persona base doble"*, frase que se contradice sola. Se agregó una regla al
prompt y se volvió a probar: ahora responde *"USD 2.900 por persona, USD 5.800
los dos"*. Verificado el 18/09 a las 20:53.

**Aislamiento de pruebas.** El miembro IA offline con máximo de recepción 0 no
recibe conversaciones aunque el contacto vuelva a escribir. Se verificó
explícitamente: un DM nuevo no disparó reasignación automática.

**Lo que sigue fallando.** El bot promete seguimiento —*"te paso con una persona
del equipo para que sigan tu consulta"*— cuando su propio prompt se lo prohíbe
mientras no haya integración. Esa regla **hay que reescribirla recién cuando la
planilla esté conectada**, porque ahí la frase deja de ser mentira.

---

## La prueba de punta a punta del 18/09

La primera corrida real: Instagram → bot → herramienta → planilla. **No escribió
la fila.** Lo que pasó, con evidencia:

| Dónde | Qué mostró |
| --- | --- |
| Instagram | El bot respondió bien y dijo "una persona del equipo continúa" |
| Planilla | Ninguna fila nueva |
| Logs de Vercel | **4 POST a `/api/rf-consulta`, los 4 con 400**, 6-9 ms, sin salida a Google |

Los 4 pedidos caen exactos en los dos momentos en que el bot se despidió: dos
intentos por cada despedida. O sea que **el agente sí llamó a la herramienta**.
Lo rechazó el endpoint.

El motivo, reproducido después en local:

```
schema_version debe ser 1
test debe ser booleano explícito
```

El plugin arma el cuerpo desde un formulario web, y un formulario manda texto:
`"1"` y `"true"`. La validación exigía los tipos nativos `1` y `true`. Rechazaba
por las comillas sobres que eran correctos en todo lo demás.

Se arregló en el borde, con `normalizeEnvelope`: el cuerpo se normaliza antes de
validarse. Adentro la lógica sigue trabajando con tipos nativos y ninguna regla
de seguridad se aflojó — un `test` vacío o ambiguo sigue siendo inválido, nunca
se interpreta como `true`.

De paso, el endpoint ahora **registra por qué rechaza**. Antes un 400 era mudo:
Vercel guardaba el status pero no el cuerpo, y averiguar qué campo falló costaba
otra ronda de pruebas contra Instagram. Ahora el log dice los motivos y la forma
de lo que llegó —nombres y tipos, nunca los valores, porque el cuerpo trae datos
personales del cliente.

**Lo que esta prueba dejó demostrado, más allá del error:** el cableado completo
funciona. El agente conoce la herramienta, la dispara sola en el momento
correcto, y el pedido llega a Vercel autenticado. Faltaba el formato.

### Lo que la prueba dejó pendiente y no es un bug

El bot preguntó *"¿querés que el equipo revise la seña?"* y, con el sí, contestó
*"listo, una persona continúa"*. Eso está mal de diseño aunque la herramienta
funcione: el bot no puede prometer contacto sin haber registrado antes. El
arreglo va en el prompt, no en el código:

- Nunca decir que una persona va a continuar sin haber llamado a
  `guardar_consulta_rf` y recibido `ok: true`.
- Dejar de preguntar si el cliente quiere que lo pasen. Pedir el WhatsApp
  directo apenas hay destino y cantidad, y registrar.

---

## El hallazgo que cambia el proyecto

**En SaleSmartly hay dos miembros: Renzo y el bot.** Ningún vendedor de Franco
tiene usuario.

Consecuencias verificadas:

- Una consulta transferida a humano queda en la cola *Unassigned*.
- La única notificación para esa cola es del navegador: no hay mail ni push.
- A los 30 días las conversaciones sin asignar se cierran solas.

**La planilla no es un complemento del inbox: es el canal de entrega.** No hay
otro. Eso convierte al puente de "integración linda" en la pieza que hace
existir al proceso comercial.

---

## El puente

### Por qué tiene la forma que tiene

Dos muros, en este orden:

**Uno.** HelpKnow autentica un plugin sólo por Header o Query. Apps Script
`doPost(e)` no expone headers HTTP. El secreto no puede ir en la URL. Header
moría en Apps Script y Query quedaba descartado.
→ Se resolvió metiendo una función de Vercel en el medio, que sí lee headers.

**Dos.** La organización de Google del dueño tiene enforzada
`iam.disableServiceAccountKeyCreation` ("Secure by default"), en versión legacy
y managed. Sin clave no se firma el JWT y la API de Sheets queda fuera de
alcance.
→ Se resolvió escribiendo vía Apps Script, que corre con la cuenta del dueño y
no necesita credenciales. Con Vercel ya en el medio, que Apps Script no lea
headers dejó de importar: Vercel le manda el secreto en el cuerpo.

```
HelpKnow --header--> Vercel --secreto en el body--> Apps Script --> planilla
```

El detalle técnico está en `docs/RF-SHEETS-BRIDGE.md`.

### Qué garantiza

Las reglas del negocio son pruebas que fallan si alguien las rompe, no
comentarios en un README:

- Las columnas del vendedor (`Estado` y `L:O`) **no se pisan nunca** en una
  actualización. Es la garantía sin la cual ningún vendedor confía en la
  planilla.
- Las fórmulas `AJ:AK` no se escriben.
- Formula injection neutralizada.
- DNI, pasaporte y tarjetas se descartan aunque lleguen.
- Identidad del sistema, no del modelo: sin `contact_id`, `case_id` y
  `revision` válidos responde 400.
- Reintentos idempotentes por revisión monotónica.
- **Baja persistente por contacto**, no por consulta: quien pidió no ser
  contactado no vuelve a entrar abriendo un caso nuevo.
- `TEST_ONLY` por defecto: rechaza consultas reales hasta que se abra.

22 pruebas unitarias y 13 escenarios de punta a punta contra una planilla falsa
que ejercita el endpoint real.

---

## Lo que falta, en orden

### 1. Terminar de conectar el puente

- Publicar el Apps Script como aplicación web y copiar la URL `/exec`
- Cargar en Vercel: `RF_BRIDGE_TOKEN`, `RF_APPSSCRIPT_URL`,
  `RF_APPSSCRIPT_TOKEN`, `RF_TEST_ONLY=true`
- Redesplegar
- Correr `npm run rf:smoke` contra el endpoint real

### 2. El plugin de HelpKnow — acá está el nudo

Reutilizar el plugin `7wbvpsb78sy4kj3k`, tool `461`, que ya existe vacío:
método POST, URL del endpoint, auth **Header** `X-RF-Token`.

**El problema sin resolver:** el puente exige que `contact_id`, `case_id` y
`revision` vengan de variables confiables del sistema, no del modelo. Si el bot
los inventa, mezcla clientes entre sí. Por eso se rechazan con 400.

Nunca se verificó qué variables de sistema expone HelpKnow para esto. **Es lo
primero que hay que averiguar** antes de configurar nada. Si no las expone, la
arquitectura de identidad hay que repensarla.

### 3. Prueba real de punta a punta

DM desde `@rafacanevaro` → la IA califica → llama la herramienta → aparece la
fila. Después borrar las filas de prueba y recién ahí evaluar `TEST_ONLY=false`.

### 4. El prompt, una vez conectado

Reescribir la regla de seguimiento: con la planilla viva, el bot ya puede decir
que la consulta quedó registrada sin mentir.

### 5. Comentarios — sesión aparte

El flujo **1050327** está ON y en producción respondiendo comentarios reales. El
borrador nuevo **1055144** (28 nodos, 12 DMs, 6 disparadores) **nunca se
ejecutó**: sólo tiene una auditoría estructural, que es mirar el plano, no
encender el motor.

Probarlo exige comentar en posts reales sin que el viejo y el nuevo respondan
dos veces. Es lo único que hoy toca clientes de verdad, así que no conviene
apurarlo.

### 6. Vendedores

No existen como usuarios en ningún lado. Hay que darles acceso a la planilla y
confirmar que la miran.

---

## Preguntas abiertas para Franco

Ninguna bloquea las pruebas. Todas bloquean vender de verdad.

1. **El vuelo de México, ¿sale de Salta o de Tucumán?** Su propio material dice
   las dos cosas: *"salida grupal desde Salta"* en el mensaje inicial y
   *"aéreos desde Tucumán"* en el de cierre. La ficha de destino refuerza Salta
   ("cupos comprados que salen desde Salta con LATAM").
2. **El plan de pagos tiene la última cuota el 20 de enero y el grupo vuelve el
   17.** ¿Cuál es la fecha real?
3. **El Perú de abril 2026 a USD 2350, ¿está muerto?** Sigue en el mismo embudo
   que el de marzo 2027 a USD 2300.
4. **La seña de México, ¿son USD 400?** Aparece tres veces consistente en su
   material. El traspaso viejo la daba por no resuelta, pero la contradicción
   era con la seña de Perú (USD 300): son destinos distintos, no versiones
   distintas.
5. **¿Alguien de su equipo va a tener usuario en SaleSmartly**, o el canal de
   entrega va a ser únicamente la planilla?

---

## Datos comerciales vigentes

### México — salida grupal Cancún + Playa del Carmen

- 09 al 17 de enero de 2027, 8 noches
- **USD 2.900 por persona, base doble**
- Incluye aéreos, alojamiento, traslados, asistencia y coordinación
- 4 noches Aloft Cancún by Marriott con desayuno + 4 Viva Maya by Wyndham en
  Playacar, all inclusive
- Seña USD 400 (a confirmar con Franco)
- **No usar:** promoción de USD 2.700 (Black Friday, vencida), excursión gratis
  a Isla Mujeres, cupos restantes, fechas límite del material viejo

### Perú — marzo 2027

- 28 de marzo al 04 de abril de 2027, 6 noches
- **USD 2.300 por pasajero, base doble**
- Aéreos Salta–Lima–Cusco–Lima–Salta con LATAM
- Letra chica: la tarifa es **por grupo de 21 pasajeros**. Sin esos 21, no
  existe.
- **No usar:** el Perú de abril 2026 a USD 2350 ni su seña de USD 300

---

## Identificadores

| Qué | Valor |
| --- | --- |
| Planilla | `1_YlPorjULhc9gtpjuOQ2depb2cXU7q5As-gWuKBeOmA` |
| Pestaña Consultas | gid `2088791631`, 37 columnas `A5:AK5`, 200 filas `6:205` |
| SaleSmartly proyecto | `72766` |
| Cuenta Instagram | `39379` |
| Miembro IA | `1306914` — dejar OFFLINE con máximo 0 fuera de pruebas |
| Miembro humano | `1299402` |
| Agente HelpKnow | `16103` |
| Base de conocimiento | `48404` |
| FAQ | `68518` México · `68519` destinos · `68520` y `68521` ejemplos · `68522` reglas · `69267` Perú 2027 |
| Plugin borrador | `7wbvpsb78sy4kj3k`, tool `461` |
| Flujo comentarios ACTIVO | `1050327` — no tocar sin plan de transición |
| Flujo comentarios borrador | `1055144` — OFF, nunca ejecutado |
| Despliegue | `between-app-nine.vercel.app` |

## Reglas que no se rompen

- No enviar pruebas a clientes reales. La única cuenta de prueba autorizada es
  `@rafacanevaro`.
- No publicar la planilla con enlace abierto.
- No inventar precios, cupos, señas ni disponibilidad.
- No guardar DNI, pasaportes ni tarjetas.
- Que exista código no significa que una integración funcione. Que una fila se
  escriba no significa que un vendedor la haya visto.

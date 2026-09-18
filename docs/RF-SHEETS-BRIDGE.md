# Puente HelpKnow → Google Sheets (Renzo y Franco)

Estado: **código escrito y probado en local. NADA conectado.**
Fecha: 18/09/2026.

## Por qué existe

El traspaso dejó la integración trabada en una incompatibilidad real:

- HelpKnow autentica un plugin sólo por **Header** o **Query**.
- Apps Script `doPost(e)` **no expone headers HTTP**. Sólo da `parameter`,
  `parameters`, `postData`, `queryString`, `pathInfo` y `contentLength`.
- El secreto no puede viajar en la URL: queda en logs y en el historial.

Header muere en Apps Script; Query es inseguro. De ahí no se sale con Apps Script.

La salida es cambiar el receptor: una función de Vercel **sí** lee headers, y el
token vive en una variable de entorno. El proyecto `between-app` ya corre en
Vercel y ya usa secretos por entorno, así que no hay infraestructura nueva.

```
HelpKnow (Header X-RF-Token)
  → /api/rf-consulta            valida el token contra RF_BRIDGE_TOKEN
  → capa de datos               Apps Script o API de Sheets
  → Consultas-Renzo-Franco      upsert en la fila del caso
  → {"ok": true, ...}
```

## Dos formas de escribir en la planilla

El endpoint elige según las variables de entorno que encuentre. Si están las
dos, gana Apps Script.

### Apps Script (recomendado)

```
HelpKnow --header--> Vercel --secreto en el body--> Apps Script --> planilla
```

Apps Script corre con la cuenta del dueño de la planilla: **no necesita cuenta
de servicio, ni clave, ni proyecto de Google Cloud**. Eso importa porque muchas
organizaciones de Google bloquean por defecto la creación de claves
(`iam.disableServiceAccountKeyCreation`, parte de "Secure by default"), y sin
clave la API oficial queda fuera de alcance.

El motivo por el que Apps Script no servía al principio —no lee headers— deja
de pesar con Vercel en el medio: Vercel le manda el secreto en el cuerpo, que
`doPost` sí lee.

Se instala pegando `scripts/apps-script/Codigo.gs` en el editor de Apps Script
de la planilla. Ese script crea la pestaña `_integracion` oculta por su cuenta,
y toma un candado de escritura antes de tocar celdas, así que dos consultas
simultáneas no se pisan.

Variables: `RF_APPSSCRIPT_URL` y `RF_APPSSCRIPT_TOKEN`.

### API de Sheets con cuenta de servicio

Variables: `RF_SHEET_ID`, `RF_GOOGLE_CLIENT_EMAIL` y `RF_GOOGLE_PRIVATE_KEY`.
Requiere poder crear una clave de cuenta de servicio y compartir la planilla
sólo con ese email.

## Qué está hecho

| Archivo | Rol |
| --- | --- |
| `api/rf-consulta.js` | Endpoint: auth por header, contrato, modo TEST_ONLY |
| `api/_lib/rf-mapping.js` | Las 37 columnas, los rangos, qué es del vendedor |
| `api/_lib/rf-core.js` | Validación, sanitización, armado de fila, idempotencia |
| `api/_lib/rf-repo.js` | Búsqueda de fila, bloques de escritura, ledger |
| `api/_lib/rf-sheets.js` | Cliente de la API de Sheets con JWT firmado |
| `api/_lib/rf-appsscript.js` | Cliente de la app web de Apps Script |
| `scripts/apps-script/Codigo.gs` | Lo que se pega en el editor de la planilla |
| `api/_lib/rf-bridge.test.js` | 32 pruebas unitarias, `npm test` |
| `scripts/rf-fake-sheets.mjs` | El endpoint real contra una planilla en memoria |
| `scripts/rf-smoke.mjs` | 17 escenarios de punta a punta |

## Reglas del traspaso que el código hace cumplir

- **Columnas del vendedor intocables.** `Estado` (B) y `Contactado el`,
  `Cotización enviada el`, `Próxima acción`, `Notas del vendedor` (L:O) se
  escriben al crear la fila y nunca al actualizarla. Una actualización sólo
  toca los bloques **C:K** y **P:AI**, calculados desde el mapeo.
- **Fórmulas AJ:AK nunca se escriben.** El rango de insert corta en AI.
- **Formula injection.** Toda celda que arranca con `=` `+` `-` `@` o un
  carácter de control se guarda como texto literal.
- **Nada de documentos.** DNI, pasaporte, tarjeta, CVV y CBU se descartan
  aunque el modelo los mande.
- **Identidad del sistema, no del modelo.** `contact_id`, `case_id` y
  `revision` son obligatorios y con formato validado. Sin ellos, 400.
- **Idempotencia.** Una `revision` menor o igual a la guardada no pisa la fila:
  los reintentos son seguros.
- **Baja persistente por contacto.** Si el contacto se dio de baja en
  cualquier consulta anterior, una consulta nueva suya tampoco entra. La baja
  es por persona, no por caso.
- **Aislamiento de cuenta.** `account` distinto de `renzoyfranco.viajes` → 400.
- **Capacidad 200 filas.** Si no hay fila libre responde 507, no pisa ocupadas.
- **TEST_ONLY por defecto.** Con `test: false` responde 409 hasta que vos lo abras.

## Cómo probarlo sin desplegar nada

La planilla falsa levanta el endpoint **real** y le pone una hoja en memoria
detrás, interceptando las llamadas a Google. Cubre lo que las pruebas
unitarias no ven: los rangos A1, la numeración de filas y el cableado del
handler.

```bash
npm run rf:fake        # en una terminal

RF_FAKE=1 \
RF_ENDPOINT=http://localhost:8787/api/rf-consulta \
RF_BRIDGE_TOKEN=token-de-prueba npm run rf:smoke
```

Los 17 escenarios: alta, reintento idempotente, actualización sobre la misma
fila, baja, baja que no se reactiva, baja que alcanza a un caso nuevo del
mismo contacto, consulta de baja, aislamiento de cuenta, token inválido,
rechazo en TEST_ONLY, y los dos que más importan: **una actualización no pisa
el Estado ni las notas del vendedor, pero sí refresca los datos del cliente.**

Contra el endpoint ya desplegado se corre igual, sin `RF_FAKE=1` (los dos
últimos escenarios necesitan escribir celdas a mano, así que sólo corren
contra la planilla falsa). Escribe filas sintéticas marcadas `Es prueba = Sí`
y te dice cuáles borrar al final.

## Lo que falta y necesita tu autorización

Nada de esto lo hice yo. Son los permisos que el traspaso dice que no se toman
sin tu visto bueno explícito.

1. **Publicar el Apps Script.** Pegar `scripts/apps-script/Codigo.gs` en el
   editor de la planilla, cargar `RF_SHEET_TOKEN` en las propiedades del
   script, e implementarlo como aplicación web con *Ejecutar como: Yo* y
   *Quién tiene acceso: Cualquier usuario*. La pestaña `_integracion` la crea
   el script solo.
2. **Variables de entorno en Vercel.** Los secretos los genera y carga el
   dueño; no hay ninguno en el repositorio.

   ```
   RF_BRIDGE_TOKEN           el que también va en el plugin de HelpKnow
   RF_APPSSCRIPT_URL         la URL /exec de la implementación
   RF_APPSSCRIPT_TOKEN       el mismo valor que RF_SHEET_TOKEN del script
   RF_TEST_ONLY              true
   ```

3. **Plugin en HelpKnow.** Reutilizar `7wbvpsb78sy4kj3k` tool `461`:
   método POST, URL del endpoint, auth **Header** `X-RF-Token`.

## Identidad: por qué la deriva el endpoint

HelpKnow **no expone ningún identificador de contacto ni de conversación** como
variable de sistema. Su único atributo de sistema es el número de turno de la
IA. Verificado en la UI el 18/09/2026.

Lo que sí puede inyectar en el prompt son los atributos del contacto en
SaleSmartly, y dos de ellos juntos —**nombre** y **fecha de creación**—
identifican a una persona de forma prácticamente única.

Así que el plugin manda **una sola** `identidad` y el endpoint deriva los tres
identificadores:

| Dato | De dónde sale |
| --- | --- |
| `contact_id` | huella SHA-256 de `cuenta + identidad`, normalizada |
| `case_id` | del registro: la última consulta del contacto, o una nueva |
| `revision` | del registro: la guardada más uno |

El modelo pasa de manejar tres identificadores a **ninguno**: sólo copia un
texto que el sistema ya le puso delante. La huella además evita que el nombre
de la persona quede escrito dentro del identificador, y garantiza el formato
sin importar qué caracteres traiga la identidad.

La normalización —espacios colapsados, minúsculas— tolera que el modelo altere
el texto al copiarlo, que es el modo de falla realista.

**Límite conocido y aceptado:** si SaleSmartly recrea el contacto, su fecha de
creación cambia y esa persona abriría una consulta nueva. El daño es una fila
duplicada, no dos clientes mezclados en una misma fila, que era el riesgo que
importaba evitar.

Los tres identificadores explícitos siguen aceptándose, para pruebas y para
cualquier llamador que sí los tenga.

## Contrato

```json
{
  "schema_version": 1,
  "operation": "upsert",
  "account": "renzoyfranco.viajes",
  "contact_id": "1384513880563214",
  "case_id": "rf-1384513880563214-1",
  "revision": 1,
  "test": true,
  "reason": "datos_completos",
  "estado": "Nuevo",
  "no_contactar": false,
  "lead": {
    "nombre": "Rafa",
    "whatsapp": "+54...",
    "correo": "rafa@...",
    "destino": "México",
    "tipo_viaje": "Grupal",
    "resumen": "máx 480 caracteres",
    "usuario_instagram": "rafacanevaro",
    "fecha_viaje": "enero 2027",
    "adultos": 2,
    "menores": 0,
    "permiso_contacto": true,
    "datos_completos": true,
    "datos_faltantes": []
  }
}
```

Y la forma que usa el agente, sin identificadores:

```json
{
  "schema_version": 1,
  "operation": "upsert",
  "account": "renzoyfranco.viajes",
  "identidad": "Rafa Canevaro|2026-09-17 18:12:21",
  "test": true,
  "reason": "datos_completos",
  "lead": { "nombre": "Rafa", "destino": "México", "adultos": 2 }
}
```

`operation: "check_contact"` consulta si un caso existe y si está dado de baja,
sin escribir nada.

Respuestas: `200 {ok:true}` · `400` contrato · `401` token · `409` TEST_ONLY ·
`502` fallo contra Google · `507` planilla llena.

## Chequeo de salud

Un `GET` al endpoint dice si quedó configurado y por dónde va a escribir, sin
revelar ningún secreto: informa si cada variable está presente, nunca su valor.
Se abre desde el navegador, sin herramientas ni credenciales.

```json
{
  "ok": true,
  "servicio": "rf-consulta",
  "configurado": true,
  "backend": "apps_script",
  "modo": "solo_pruebas",
  "variables": { "RF_BRIDGE_TOKEN": true, "RF_APPSSCRIPT_URL": true, "RF_APPSSCRIPT_TOKEN": true }
}
```

**`stored` no es `delivered`.** Un `ok:true` prueba que la fila se escribió.
No prueba que un vendedor la haya visto. `TEAM_READY` y los SLA de Franco
siguen en falso hasta que el equipo tenga acceso real y probado.

## Limitación conocida

Dos consultas **nuevas** simultáneas pueden calcular la misma primera fila
libre y pisarse. Por el camino de Apps Script esto queda cubierto: el script
toma un `LockService` antes de escribir. Por el camino de la API oficial sigue
abierto, porque Sheets no ofrece bloqueo.

## Notas

- **Timezone: no hay incompatibilidad.** El traspaso marcaba un conflicto entre
  Tucumán (código) y Buenos Aires (UI de la planilla). No lo hay: Argentina es
  UTC−03 en todo el país y sin horario de verano desde 2009. Mismo offset,
  siempre. El endpoint formatea en `America/Argentina/Tucuman`.
- El endpoint vive en el repo de la landing de Between porque ahí está el
  deploy de Vercel andando. Funciona, pero acopla los releases de la landing
  con los de la integración de un cliente. Si esto crece, va a su propio
  proyecto.

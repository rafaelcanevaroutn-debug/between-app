/**
 * Levanta el endpoint REAL contra una planilla falsa en memoria.
 *
 * Sirve para correr scripts/rf-smoke.mjs entero sin desplegar nada y sin
 * tocar Google. Cubre lo que las pruebas unitarias no ven: el armado de
 * rangos A1, la numeración de filas y el cableado del handler.
 *
 *   node scripts/rf-fake-sheets.mjs            # queda escuchando en 8787
 *   RF_ENDPOINT=http://localhost:8787/api/rf-consulta \
 *   RF_BRIDGE_TOKEN=token-de-prueba node scripts/rf-smoke.mjs
 */

import { createServer } from 'node:http'
import { generateKeyPairSync } from 'node:crypto'

const PUERTO = Number(process.env.PORT || 8787)
const TOKEN = process.env.RF_BRIDGE_TOKEN || 'token-de-prueba'

process.env.RF_BRIDGE_TOKEN = TOKEN
process.env.RF_SHEET_ID = 'planilla-falsa'
process.env.RF_GOOGLE_CLIENT_EMAIL = 'falso@falso.iam.gserviceaccount.com'
// El handler firma un JWT de verdad antes de hablar con Google, así que la
// clave tiene que ser una RSA válida aunque Google nunca la vea.
const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 })
process.env.RF_GOOGLE_PRIVATE_KEY = privateKey
  .export({ type: 'pkcs8', format: 'pem' })
  .toString()
process.env.RF_TEST_ONLY = process.env.RF_TEST_ONLY || 'true'

// --- planilla en memoria ---------------------------------------------------

const hojas = {
  Consultas: new Map(), // "fila" -> array de 37 celdas
  _integracion: new Map(),
}

const letraANumero = (letras) =>
  letras.split('').reduce((n, c) => n * 26 + (c.charCodeAt(0) - 64), 0) - 1

function parseRango(rango) {
  const [hoja, a1] = rango.split('!')
  const [desde, hasta] = a1.split(':')
  const m = (ref) => {
    const [, col, fila] = ref.match(/^([A-Z]+)(\d+)$/)
    return { col: letraANumero(col), fila: Number(fila) }
  }
  return { hoja, desde: m(desde), hasta: m(hasta) }
}

const filaDe = (hoja, n) => {
  if (!hojas[hoja].has(n)) hojas[hoja].set(n, new Array(37).fill(''))
  return hojas[hoja].get(n)
}

function leer(rango) {
  const { hoja, desde, hasta } = parseRango(rango)
  const salida = []
  for (let f = desde.fila; f <= hasta.fila; f++) {
    const fila = hojas[hoja].get(f)
    salida.push(fila ? fila.slice(desde.col, hasta.col + 1) : [])
  }
  // La API de Sheets recorta las filas vacías del final.
  while (salida.length && salida[salida.length - 1].every((c) => !c)) salida.pop()
  return salida
}

function escribir(rango, valores) {
  const { hoja, desde } = parseRango(rango)
  let celdas = 0
  valores.forEach((fila, i) => {
    const destino = filaDe(hoja, desde.fila + i)
    fila.forEach((valor, j) => {
      destino[desde.col + j] = valor
      celdas++
    })
  })
  return celdas
}

// --- interceptar las llamadas a Google -------------------------------------

const fetchReal = globalThis.fetch
globalThis.fetch = async (url, opciones = {}) => {
  const href = String(url)

  if (href.startsWith('https://oauth2.googleapis.com/token')) {
    return new Response(JSON.stringify({ access_token: 'token-falso' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (href.includes('sheets.googleapis.com')) {
    if (href.includes(':batchUpdate')) {
      const { data } = JSON.parse(opciones.body)
      const total = data.reduce((n, d) => n + escribir(d.range, d.values), 0)
      return new Response(JSON.stringify({ totalUpdatedCells: total }), { status: 200 })
    }
    const rango = decodeURIComponent(href.split('/values/')[1])
    return new Response(JSON.stringify({ values: leer(rango) }), { status: 200 })
  }

  return fetchReal(url, opciones)
}

// --- servidor --------------------------------------------------------------

const { default: handler } = await import('../api/rf-consulta.js')

createServer(async (req, res) => {
  const trozos = []
  for await (const t of req) trozos.push(t)
  const cuerpo = Buffer.concat(trozos)

  // Puerta de inspección: sirve para comprobar desde afuera que una
  // actualización respetó las celdas del vendedor. Sólo existe en el fake.
  const debug = req.url.match(/^\/debug\/consultas\/(\d+)$/)
  if (debug) {
    const fila = Number(debug[1])
    if (req.method === 'POST') {
      const { columna, valor } = JSON.parse(cuerpo.toString())
      filaDe('Consultas', fila)[columna] = valor
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ fila, celdas: hojas.Consultas.get(fila) || [] }))
    return
  }

  const peticion = new Request(`http://localhost${req.url}`, {
    method: req.method,
    headers: req.headers,
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : cuerpo,
  })

  const respuesta = await handler(peticion)
  res.writeHead(respuesta.status, { 'Content-Type': 'application/json' })
  res.end(await respuesta.text())
}).listen(PUERTO, () => {
  console.log(`Planilla falsa escuchando en http://localhost:${PUERTO}/api/rf-consulta`)
  console.log(`Token: ${TOKEN}`)
})

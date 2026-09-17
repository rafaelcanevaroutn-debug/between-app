# Puente HelpKnow → Google Sheets (Renzo y Franco)

Estado: **código escrito y probado en local. NADA desplegado. NADA conectado.**
Fecha: 17/09/2026.

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
  → Google Sheets API           service account, scope spreadsheets
  → Consultas-Renzo-Franco      upsert en la fila del caso
  → {"ok": true, ...}
```

## Qué está hecho

| Archivo | Rol |
| --- | --- |
| `api/rf-consulta.js` | Endpoint: auth por header, contrato, modo TEST_ONLY |
| `api/_lib/rf-mapping.js` | Las 37 columnas, los rangos, qué es del vendedor |
| `api/_lib/rf-core.js` | Validación, sanitización, armado de fila, idempotencia |
| `api/_lib/rf-repo.js` | Búsqueda de fila, bloques de escritura, ledger |
| `api/_lib/rf-sheets.js` | Cliente Sheets con JWT firmado, sin dependencias nuevas |
| `api/_lib/rf-bridge.test.js` | 15 pruebas, `npm test` |

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
- **Baja persistente.** Una fila con `No contactar = Sí` no se reactiva.
- **Aislamiento de cuenta.** `account` distinto de `renzoyfranco.viajes` → 400.
- **Capacidad 200 filas.** Si no hay fila libre responde 507, no pisa ocupadas.
- **TEST_ONLY por defecto.** Con `test: false` responde 409 hasta que vos lo abras.

## Lo que falta y necesita tu autorización

Nada de esto lo hice yo. Son los permisos que el traspaso dice que no se toman
sin tu visto bueno explícito.

1. **Service account de Google.** Crear uno, bajar la clave, y compartir la
   planilla **sólo con ese email**, como Editor. Nunca "Cualquier persona con
   el enlace". Scope: `https://www.googleapis.com/auth/spreadsheets`.
2. **Pestaña `_integracion`.** Una pestaña oculta, cuatro columnas:
   `case_id | revision | contact_id | actualizado_el`. Es aditiva: no toca las
   37 columnas ni las 200 filas. Sin ella los reintentos dejan de ser
   idempotentes, porque no hay dónde guardar qué revisión ya se aplicó.
3. **Variables de entorno en Vercel.** El secreto lo generás y lo cargás vos;
   yo no lo veo ni lo escribo en el repo.

   ```
   RF_BRIDGE_TOKEN           cadena larga al azar, la misma en HelpKnow
   RF_SHEET_ID               1_YlPorjULhc9gtpjuOQ2depb2cXU7q5As-gWuKBeOmA
   RF_GOOGLE_CLIENT_EMAIL    ...@....iam.gserviceaccount.com
   RF_GOOGLE_PRIVATE_KEY     la clave privada, con los \n escapados
   RF_TEST_ONLY              true
   ```

4. **Plugin en HelpKnow.** Reutilizar `7wbvpsb78sy4kj3k` tool `461`:
   método POST, URL del endpoint, auth **Header** `X-RF-Token`.

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

`operation: "check_contact"` consulta si un caso existe y si está dado de baja,
sin escribir nada.

Respuestas: `200 {ok:true}` · `400` contrato · `401` token · `409` TEST_ONLY ·
`502` fallo contra Google · `507` planilla llena.

**`stored` no es `delivered`.** Un `ok:true` prueba que la fila se escribió.
No prueba que un vendedor la haya visto. `TEAM_READY` y los SLA de Franco
siguen en falso hasta que el equipo tenga acceso real y probado.

## Notas

- **Timezone: no hay incompatibilidad.** El traspaso marcaba un conflicto entre
  Tucumán (código) y Buenos Aires (UI de la planilla). No lo hay: Argentina es
  UTC−03 en todo el país y sin horario de verano desde 2009. Mismo offset,
  siempre. El endpoint formatea en `America/Argentina/Tucuman`.
- El endpoint vive en el repo de la landing de Between porque ahí está el
  deploy de Vercel andando. Funciona, pero acopla los releases de la landing
  con los de la integración de un cliente. Si esto crece, va a su propio
  proyecto.

# Sumar un cliente al puente

Qué hay que hacer para que un negocio nuevo tenga su bot de Instagram
escribiendo en su propia planilla. El primer cliente llevó una semana; con
esto, el segundo es una tarde.

El orden importa. Cada paso produce un dato que el siguiente necesita.

## Antes de empezar: lo que hay que juntar del cliente

Sin esto no se puede escribir el prompt, y un bot sin esto inventa precios.

- Qué vende, con **precios exactos** y qué incluye cada uno
- Fechas, cupos y condiciones (seña, plan de pagos, mínimos de grupo)
- Las preguntas que le hacen todos los días, con la respuesta real
- **Qué NO puede decir el bot**: promociones vencidas, precios viejos,
  cualquier cosa que ya no esté vigente
- El usuario de Instagram de la cuenta
- Los mails de las personas que van a trabajar las consultas

Lo último no es un trámite: una consulta registrada que nadie abre es una
consulta perdida con pasos extra.

## 1. La cuenta de SaleSmartly

El plan Free da **1 canal y 2 miembros**. Un cliente entra justo: su Instagram,
y como miembros el dueño más el bot. Para dos clientes en la misma cuenta hay
que pasar a Pro y pagar un miembro extra por cada bot.

Decidir primero. Conectar después el Instagram del cliente.

## 2. La planilla

Copiar la planilla del primer cliente. Lleva las 37 columnas, las 200 filas,
las fórmulas de `AJ:AK`, los desplegables de `Estado` y la hoja `Guía`.

Después, sobre la copia:

1. Borrar los datos: en el cuadro de nombre escribir `A6:AI205` y Suprimir.
   **Nunca eliminar filas** — las fórmulas son por fila y se van con ellas.
2. Mostrar la hoja oculta `_integracion`, borrar `A2:E501`, volver a ocultarla.
3. Compartirla con los vendedores del cliente, permiso **Editor**: ellos
   escriben `Estado` y `Notas del vendedor`. El puente nunca pisa esas columnas.

## 3. El Apps Script

La copia trae el script, pero **no la publicación**: una implementación no se
copia. Hay que publicarla de nuevo.

1. Extensiones → Apps Script
2. Propiedades del script: cargar `RF_SHEET_TOKEN` con un valor nuevo,
   distinto del de los otros clientes
3. Implementar como aplicación web: *Ejecutar como: Yo*, *Quién tiene acceso:
   Cualquier usuario*
4. Guardar la URL `/exec`

## 4. Las variables en Vercel

Cada cliente lleva sus variables con el nombre de la cuenta al final, en
mayúsculas y con todo lo que no sea letra o número convertido en `_`:

```
RF_CUENTAS = renzoyfranco.viajes,cuenta.del.cliente

RF_APPSSCRIPT_URL_CUENTA_DEL_CLIENTE    = la URL /exec del paso 3
RF_APPSSCRIPT_TOKEN_CUENTA_DEL_CLIENTE  = el mismo valor que RF_SHEET_TOKEN
```

`RF_BRIDGE_TOKEN` y `RF_TEST_ONLY` son del despliegue, no de cada cliente.

**Redesplegar.** Sin redespliegue las variables no toman efecto.

Verificar abriendo el endpoint en el navegador: tiene que aparecer una fila
por cliente, cada una con su backend resuelto.

```json
{
  "configurado": true,
  "cuentas": [
    { "cuenta": "renzoyfranco.viajes", "backend": "apps_script" },
    { "cuenta": "cuenta.del.cliente", "backend": "apps_script" }
  ]
}
```

Un `backend: null` es un cliente a medio configurar. Sus consultas van a
responder 500 `cuenta_sin_configurar` — nunca a caer en la planilla de otro.

## 5. El agente en HelpKnow

Partir del agente del primer cliente y reemplazar lo que es suyo: el negocio,
los precios, la base de conocimiento.

Lo que **no** se toca, porque es la mecánica y ya está probada:

- La regla de registrar antes de prometer
- Pedir el WhatsApp directo en vez de preguntar si quiere que lo pasen
- El formato de `identidad`: `{Nombre} | {Fecha y hora de creación}`

## 6. La herramienta

Un plugin nuevo, apuntando al mismo endpoint:

- Método **POST**, URL `/api/rf-consulta`
- Auth **Header**, `X-RF-Token`, con el `RF_BRIDGE_TOKEN` del despliegue
- Parámetros fijos: `schema_version` = `1`, `operation` = `upsert`,
  `account` = **la cuenta del cliente**, `test` = `true` mientras se prueba
- Parámetros que completa la IA: `identidad`, `reason`, `lead`

Ponerle un nombre y una descripción que digan qué hace y cuándo llamarla. La
descripción es lo que el modelo lee para decidir si usarla: si dice "borrador",
el modelo duda.

## 7. Atar el bot a su canal

En Connections → Instagram del cliente → **Assign Member**: dejar únicamente a
su bot.

Esto es lo que impide que una consulta de un cliente caiga en el bot de otro.
Sin esto, las conversaciones nuevas se reparten entre los agentes disponibles.

## 8. Encender

1. Subir el máximo de recepción del miembro IA de `0` a `9999`
2. Probar con un DM desde una cuenta propia, con el bot todavía en `test: true`
3. Verificar que aparece la fila
4. Recién entonces: `test` a `false` en el plugin

Si `RF_TEST_ONLY` ya está en `false` para los otros clientes, el paso 4 es lo
único que separa a este cliente de producción.

## Lo que se aprendió haciéndolo la primera vez

- **Un 400 mudo cuesta un día.** El endpoint registra por qué rechaza: nombres
  y tipos de lo recibido, nunca los valores.
- **El cuerpo llega como texto.** El plugin se configura desde un formulario y
  manda `"1"`, no `1`. Está contemplado.
- **El máximo de recepción en 0 lo frena todo.** Con 0 no entra ninguna
  conversación sola, y las pruebas igual "funcionan" porque uno asigna a mano.
  Parece autónomo y no lo es.
- **El cupo de mensajes es mensual.** Free da 200 por mes. Cuando se agota, el
  bot deja de contestar sin avisar y vuelve solo al mes siguiente.

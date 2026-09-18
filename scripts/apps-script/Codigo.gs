/**
 * Capa de datos de la planilla Consultas-Renzo-Franco.
 *
 * Se pega en el Apps Script vinculado a la planilla y se publica como
 * aplicación web. Corre con la cuenta del dueño, así que no hace falta
 * cuenta de servicio, ni clave, ni proyecto de Google Cloud, ni pelear con
 * las políticas de organización que bloquean la creación de claves.
 *
 * Es deliberadamente tonta: lee rangos y escribe rangos. Toda la lógica de
 * negocio (validación, idempotencia, bajas, columnas del vendedor) vive en
 * el endpoint de Vercel, donde está probada.
 *
 * Autenticación: el secreto viaja en el CUERPO del pedido, que es lo único
 * que doPost puede leer. Nunca en la URL.
 *
 * Instalación:
 *   1. Extensiones → Apps Script, desde la planilla
 *   2. Pegar este archivo entero
 *   3. Configuración del proyecto → Propiedades del script:
 *        RF_SHEET_TOKEN = el mismo secreto que RF_APPSSCRIPT_TOKEN en Vercel
 *   4. Implementar → Nueva implementación → Aplicación web
 *        Ejecutar como: Yo
 *        Quién tiene acceso: Cualquier usuario
 *   5. Copiar la URL /exec y ponerla en RF_APPSSCRIPT_URL en Vercel
 */

var LEDGER_TITLE = '_integracion';
var LEDGER_HEADERS = ['case_id', 'revision', 'contact_id', 'actualizado_el', 'no_contactar'];

function responder(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Compara en tiempo constante. Apps Script no trae utilidad para esto, así
 * que se recorre siempre la cadena entera en lugar de cortar en la primera
 * diferencia.
 */
function tokenValido(recibido, esperado) {
  if (!recibido || !esperado || recibido.length !== esperado.length) return false;
  var diferencia = 0;
  for (var i = 0; i < esperado.length; i++) {
    diferencia |= recibido.charCodeAt(i) ^ esperado.charCodeAt(i);
  }
  return diferencia === 0;
}

/**
 * Crea la pestaña del ledger si todavía no existe, con sus encabezados y
 * oculta. Así no queda como un paso manual que alguien puede saltearse.
 */
function asegurarLedger(planilla) {
  var hoja = planilla.getSheetByName(LEDGER_TITLE);
  if (hoja) return hoja;

  hoja = planilla.insertSheet(LEDGER_TITLE);
  hoja.getRange(1, 1, 1, LEDGER_HEADERS.length).setValues([LEDGER_HEADERS]);
  hoja.hideSheet();
  return hoja;
}

/** Saca las filas vacías del final, igual que hace la API de Sheets. */
function recortar(valores) {
  var fin = valores.length;
  while (fin > 0) {
    var fila = valores[fin - 1];
    var vacia = true;
    for (var i = 0; i < fila.length; i++) {
      if (String(fila[i]).length > 0) {
        vacia = false;
        break;
      }
    }
    if (!vacia) break;
    fin--;
  }
  return valores.slice(0, fin);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responder({ ok: false, error: 'cuerpo_vacio' });
    }

    var pedido = JSON.parse(e.postData.contents);
    var esperado = PropertiesService.getScriptProperties().getProperty('RF_SHEET_TOKEN');

    if (!esperado) {
      return responder({ ok: false, error: 'script_sin_token_configurado' });
    }
    if (!tokenValido(pedido.token, esperado)) {
      return responder({ ok: false, error: 'no_autorizado' });
    }

    var planilla = SpreadsheetApp.getActiveSpreadsheet();
    asegurarLedger(planilla);

    if (pedido.op === 'get') {
      var valores = [];
      for (var i = 0; i < pedido.ranges.length; i++) {
        valores.push(recortar(planilla.getRange(pedido.ranges[i]).getValues()));
      }
      return responder({ ok: true, values: valores });
    }

    if (pedido.op === 'update') {
      // Un candado de escritura evita que dos consultas simultáneas calculen
      // la misma primera fila libre y se pisen.
      var candado = LockService.getScriptLock();
      candado.waitLock(20000);
      try {
        var celdas = 0;
        for (var j = 0; j < pedido.data.length; j++) {
          var bloque = pedido.data[j];
          planilla.getRange(bloque.range).setValues(bloque.values);
          celdas += bloque.values.length * bloque.values[0].length;
        }
        SpreadsheetApp.flush();
        return responder({ ok: true, updatedCells: celdas });
      } finally {
        candado.releaseLock();
      }
    }

    return responder({ ok: false, error: 'operacion_desconocida' });
  } catch (error) {
    return responder({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

/**
 * Sirve para confirmar desde el navegador que la implementación quedó viva.
 * No expone ningún dato de la planilla.
 */
function doGet() {
  return responder({ ok: true, servicio: 'puente-rf', listo: true });
}

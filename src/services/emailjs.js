import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export async function sendLeadEmail(email, source) {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        email: email,
        source: source,
        name: email,
        message: 'Nuevo lead desde: ' + source,
        time: new Date().toLocaleString('es-AR'),
      },
      PUBLIC_KEY
    )
    return true
  } catch {
    return false
  }
}

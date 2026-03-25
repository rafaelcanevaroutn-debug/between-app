import emailjs from '@emailjs/browser'

export async function sendLeadEmail(email, source) {
  console.log('Intentando enviar email...')
  console.log('Service ID:', 'service_oa2fogh')
  console.log('Template ID:', 'template_krbfmwh')
  console.log('Public Key:', 'wdLYsdAZun-gZ6i7S')
  console.log('Params:', { email, source })

  try {
    const result = await emailjs.send(
      'service_oa2fogh',
      'template_krbfmwh',
      {
        email: email,
        source: source,
        name: email,
        message: 'Nuevo lead desde: ' + source,
        time: new Date().toLocaleString('es-AR'),
      },
      'wdLYsdAZun-gZ6i7S'
    )
    console.log('SUCCESS:', result)
    return true
  } catch (error) {
    console.error('ERROR COMPLETO:', error)
    console.error('Status:', error.status)
    console.error('Text:', error.text)
    return false
  }
}

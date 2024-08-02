import fetch from 'node-fetch'; // Importa `fetch` solo si es necesario, para Node.js 20 es nativo.
import { send } from 'emailjs-com';

export async function handler(event) {
    if (event.httpMethod === 'POST') {
        try {
            const formData = JSON.parse(event.body);
            const recaptchaToken = formData['g-recaptcha-response'];

            // Verificar el reCAPTCHA
            const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
            const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
            const response = await fetch(recaptchaUrl, { method: 'POST' });
            const data = await response.json();

            if (data.success) {
                // Enviar correo usando EmailJS
                const emailResponse = await send(
                    process.env.EMAILJS_SERVICE_ID,
                    process.env.EMAILJS_TEMPLATE_ID,
                    {
                        from_name: formData['nombre'],
                        from_email: formData['email'],
                        message: formData['mensaje']
                    },
                    process.env.EMAILJS_API_KEY
                );

                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Formulario de contacto enviado correctamente.' }),
                };
            } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Error en la verificación del reCAPTCHA.' }),
                };
            }
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error al procesar el formulario.' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Método no permitido.' }),
    };
}

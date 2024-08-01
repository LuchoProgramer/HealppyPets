const fetch = require('node-fetch');
const emailjs = require('emailjs-com');

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            // Obtén los datos del formulario
            const formData = JSON.parse(event.body);
            const recaptchaToken = formData['g-recaptcha-response'];

            // Verificar el reCAPTCHA
            const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
            const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
            const response = await fetch(recaptchaUrl, { method: 'POST' });
            const data = await response.json();

            if (data.success) {
                // Enviar correo usando EmailJS
                const emailResponse = await emailjs.send(
                    process.env.your_service_id, // Usa el Service ID de EmailJS
                    process.env.your_template_id, // Usa el Template ID de EmailJS
                    {
                        from_name: formData['nombre'],
                        from_email: formData['email'],
                        message: formData['mensaje']
                    },
                    process.env.EMAILJS_API_KEY // Usa la API Key pública de EmailJS
                );

                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Formulario enviado correctamente.' }),
                };
            } else {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Error en la verificación del reCAPTCHA.' }),
                };
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error al enviar el correo.' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Método no permitido.' }),
    };
};

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            // Obtén los datos del formulario
            const formData = JSON.parse(event.body);
            const recaptchaToken = formData['g-recaptcha-response'];

            // Configura la clave secreta y la URL de reCAPTCHA
            const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
            const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;

            // Verifica el token con Google reCAPTCHA
            const response = await fetch(recaptchaUrl, { method: 'POST' });
            const data = await response.json();

            if (data.success) {
                // Aquí puedes manejar el formulario, como guardar datos o enviar correos
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
            console.error('Error al verificar el reCAPTCHA:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error al verificar el reCAPTCHA.' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Método no permitido.' }),
    };
};

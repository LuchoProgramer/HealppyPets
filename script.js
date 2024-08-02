document.addEventListener('DOMContentLoaded', function () {
    // Manejar el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Previene el envío del formulario

            const formData = new FormData(contactForm);
            const data = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                mensaje: formData.get('mensaje'),
                'g-recaptcha-response': formData.get('g-recaptcha-response')
            };

            try {
                const response = await fetch('./netlify/functions/procesar_formulario', {
                    method: 'POST',
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Formulario de contacto enviado correctamente.');
                } else {
                    alert('Error al enviar el formulario de contacto.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al enviar el formulario de contacto.');
            }
        });
    }

    // Manejar el botón de agendar cita
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        const submitButton = appointmentForm.querySelector('button[type="button"]');
        if (submitButton) {
            submitButton.addEventListener('click', prepareWhatsAppMessage);
        }
    }

    // Mostrar u ocultar el botón de regreso al principio en función del desplazamiento
    window.addEventListener('scroll', function() {
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 300) { // Mostrar el botón si se desplaza más de 300 píxeles hacia abajo
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
});

function prepareWhatsAppMessage() {
    const nombreMascota = document.getElementById('nombre-mascota').value.trim();
    const fecha = document.getElementById('fecha').value.trim();
    const hora = document.getElementById('hora').value.trim();

    if (!nombreMascota || !fecha || !hora) {
        alert('Por favor, completa todos los campos.');
        return false;
    }

    const message = `Nombre de la Mascota: ${encodeURIComponent(nombreMascota)}%0AFecha: ${encodeURIComponent(fecha)}%0AHora: ${encodeURIComponent(hora)}`;
    const whatsappUrl = `https://wa.me/593987125458?text=${message}`;

    window.location.href = whatsappUrl;
    return false; // Previene el envío del formulario tradicional
}
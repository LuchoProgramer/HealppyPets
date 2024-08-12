document.addEventListener('DOMContentLoaded', function () {
    // Cachear elementos del DOM
    const appointmentForm = document.getElementById('appointmentForm');
    const contactForm = document.getElementById('contact-form');
    const backToTop = document.getElementById('backToTop');
    
    // Manejar el botón de agendar cita
    if (appointmentForm) {
        const submitButton = appointmentForm.querySelector('button[type="button"]');
        if (submitButton) {
            submitButton.addEventListener('click', prepareWhatsAppMessage);
        }
    }

    // Mostrar u ocultar el botón de regreso al principio en función del desplazamiento
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        });
    }

    // Manejar el formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
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
    window.location.href = `https://wa.me/593987005084?text=${message}`;
    return false; // Previene el envío del formulario tradicional
}

function handleContactFormSubmit(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    event.stopPropagation(); // Prevenir que el evento se propague

    const form = event.target;

    // Validar el formulario
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    // Verificar reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert('Por favor, verifica el reCAPTCHA.');
        return;
    }

    // Enviar el formulario usando EmailJS
    emailjs.sendForm('service_066w7i9', 'template_q7peraq', form, 'jgAwVR-flCTKQnK_X')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('¡El mensaje ha sido enviado correctamente!');
            form.reset(); // Reiniciar el formulario
            form.classList.remove('was-validated'); // Remover la clase de validación
            grecaptcha.reset(); // Reiniciar reCAPTCHA
        }, function(error) {
            console.error('FAILED...', error);
            alert('Hubo un problema al enviar el mensaje.');
        });
}

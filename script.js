// Función para calcular el resultado del quiz
function calculateResult() {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    
    let totalScore = 0;
    formData.forEach((value) => {
        totalScore += parseInt(value);
    });

    let resultMessage;
    if (totalScore >= 5 && totalScore <= 7) {
        resultMessage = `
            <h5>Relajado y Confiado</h5>
            <p>Eres un dueño relajado y confiado. Disfrutas de la compañía de tu mascota sin mucho estrés y le das suficiente libertad para explorar. Tu mascota probablemente se siente segura y feliz contigo.</p>
        `;
    } else if (totalScore >= 8 && totalScore <= 13) {
        resultMessage = `
            <h5>Atento y Cariñoso</h5>
            <p>Eres un dueño atento y cariñoso. Te preocupas mucho por el bienestar de tu mascota y te aseguras de que siempre esté bien cuidada. Amas pasar tiempo con tu mascota y ella seguramente disfruta de todo el amor y atención que le brindas.</p>
        `;
    } else if (totalScore >= 14 && totalScore <= 20) {
        resultMessage = `
            <h5>Extremadamente Dedicado y Responsable</h5>
            <p>Eres un dueño extremadamente dedicado y responsable. Te tomas muy en serio el cuidado de tu mascota y haces todo lo posible para asegurarte de que tenga la mejor vida posible. Tu mascota es muy afortunada de tener un dueño como tú.</p>
        `;
    } else {
        resultMessage = 'Puntuación fuera del rango esperado. Asegúrate de responder todas las preguntas.';
    }

    // Mostrar el resultado en el nuevo modal
    document.getElementById('result').innerHTML = resultMessage;

    // Ocultar el modal del quiz
    const quizModal = bootstrap.Modal.getInstance(document.getElementById('quizModal'));
    if (quizModal) {
        quizModal.hide();
    }

    // Mostrar el modal de resultados
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}

// Función para enviar el formulario de contacto a EmailJS mediante Netlify Functions
async function sendContactForm(event) {
    event.preventDefault(); // Evita el envío del formulario tradicional

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('./netlify/functions/procesar_formulario.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        form.reset();
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario.');
    }
}

// Función para enviar el formulario de agendar cita a WhatsApp
function sendAppointmentToWhatsApp(event) {
    event.preventDefault(); // Evita el envío del formulario tradicional

    const nombreMascota = document.getElementById('nombre-mascota').value.trim();
    const fecha = document.getElementById('fecha').value.trim();
    const hora = document.getElementById('hora').value.trim();

    // Validar que los campos no estén vacíos
    if (!nombreMascota || !fecha || !hora) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const whatsappNumber = '593987125458';  // Número de WhatsApp en formato internacional
    const message = `Nombre de la Mascota: ${encodeURIComponent(nombreMascota)}%0AFecha: ${encodeURIComponent(fecha)}%0AHora: ${encodeURIComponent(hora)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.location.href = whatsappUrl;
}

// Asegúrate de agregar los manejadores de eventos después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', sendContactForm);
    document.getElementById('appointmentForm').addEventListener('submit', sendAppointmentToWhatsApp);
});

// Mostrar u ocultar el botón de regreso al principio en función del desplazamiento
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) { // Mostrar el botón si se desplaza más de 300 píxeles hacia abajo
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

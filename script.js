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


// script.js

// Función para enviar el formulario de contacto a WhatsApp
function sendContactToWhatsApp() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validar que los campos no estén vacíos
    if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Validar formato de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingresa una dirección de correo electrónico válida.');
        return;
    }

    const whatsappNumber = '593987125458'; // Número de WhatsApp en formato internacional
    const message = `Nombre: ${encodeURIComponent(nombre)}%0AEmail: ${encodeURIComponent(email)}%0AMensaje: ${encodeURIComponent(mensaje)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.location.href = whatsappUrl;
}

// Función para enviar el formulario de agendar cita a WhatsApp
function sendAppointmentToWhatsApp() {
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
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario tradicional
        sendContactToWhatsApp();
    });

    document.getElementById('appointmentForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario tradicional
        sendAppointmentToWhatsApp();
    });
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
document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    let userAnswers = [];

    // Función para cargar el cuestionario desde un archivo JSON
    async function loadQuiz(jsonFile) {
        try {
            const response = await fetch(jsonFile);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const quiz = await response.json();
            return quiz;
        } catch (error) {
            console.error('Error fetching quiz:', error);
            return null;
        }
    }

    // Función para mostrar una pregunta específica
    function showQuestion(quiz, index) {
        const question = quiz.questions[index];
        let questionHTML = `
            <div class="mb-3">
                <h5>${question.question}</h5>
                <ul class="list-group">
                ${question.options.map((option, i) => `
                    <li class="list-group-item list-group-item-action option-btn" data-value="${option.value}">
                        ${option.text}
                    </li>
                `).join('')}
                </ul>
            </div>
        `;

        document.getElementById('quiz').innerHTML = questionHTML;

        // Manejar el clic en las opciones
        document.querySelectorAll('.option-btn').forEach(button => {
            button.addEventListener('click', function() {
                const selectedValue = parseInt(this.getAttribute('data-value'));
                userAnswers.push(selectedValue);
                if (index < quiz.questions.length - 1) {
                    currentQuestionIndex++;
                    showQuestion(quiz, currentQuestionIndex);
                } else {
                    showResult(quiz);
                }
            });
        });
    }

    // Función para abrir el cuestionario
    async function openQuiz(jsonFile) {
        const quiz = await loadQuiz(jsonFile);
        if (!quiz) {
            alert('Quiz no encontrado');
            return;
        }

        currentQuestionIndex = 0;
        userAnswers = [];
        showQuestion(quiz, currentQuestionIndex);

        const myModal = new bootstrap.Modal(document.getElementById('quizModal'));
        myModal.show();
    }

    // Función para mostrar el resultado final
    function showResult(quiz) {
        const totalScore = userAnswers.reduce((a, b) => a + b, 0);
        const personality = quiz.personalities.find(p => totalScore >= p.range[0] && totalScore <= p.range[1]);

        let resultHTML = `<h3>${personality.type}</h3><p>${personality.description}</p>`;
        document.getElementById('quiz').innerHTML = '';
        document.getElementById('result-text').innerHTML = resultHTML;
        document.getElementById('result').style.display = 'block';
    }

    // Aquí es donde se debe añadir el código para capturar el parámetro de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const quizFile = urlParams.get('quiz');

    // Si hay un parámetro 'quiz' en la URL, abre el quiz correspondiente
    if (quizFile) {
        openQuiz('Data/' + quizFile);
    }

    window.openQuiz = openQuiz;

    document.getElementById('quizModal').addEventListener('hidden.bs.modal', function() {
        document.getElementById('quiz').innerHTML = '';
        document.getElementById('result').style.display = 'none';
    });
});


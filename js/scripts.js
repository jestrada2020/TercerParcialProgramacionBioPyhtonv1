// Objeto para almacenar los resultados y estado de verificación
const results = {};
const verified = {};

// Función para verificar una respuesta individual
function checkAnswer(questionNumber) {
    const questionId = `q${questionNumber}`;
    const feedbackDiv = document.getElementById(`${questionId}-feedback`);
    feedbackDiv.innerHTML = "";

    let allCorrect = true;
    let correctCount = 0;
    const correctAnswersList = correctAnswers[questionId];
    const totalParts = correctAnswersList.length;

    for (let i = 1; i <= totalParts; i++) {
        const partId = `${questionId}-part${i}`;
        const placeholder = document.getElementById(partId);
        if (!placeholder) {
            console.error(`Placeholder ${partId} no encontrado.`);
            continue;
        }
        const userAnswer = placeholder.textContent.trim();
        const correctAnswer = correctAnswersList[i-1];

        placeholder.classList.remove("correct", "incorrect");

        const normalize = (str) => str.toLowerCase().replace(/['"]/g, '');
        const normalizedUserAnswer = normalize(userAnswer);
        const normalizedCorrectAnswer = normalize(correctAnswer);

        if (normalizedUserAnswer === normalizedCorrectAnswer) {
            placeholder.classList.add("correct");
            correctCount++;
        } else {
            placeholder.classList.add("incorrect");
            allCorrect = false;
        }
    }

    const questionScore = (correctCount / totalParts) * pointValues[questionId];
    results[questionId] = questionScore;
    verified[questionId] = true;

    if (allCorrect) {
        feedbackDiv.innerHTML = `<span class="text-green-700 font-semibold">¡Correcto! (+${pointValues[questionId]} puntos)</span>`;
        feedbackDiv.className = "mt-2 p-3 rounded-md bg-green-100";
    } else if (correctCount > 0) {
        feedbackDiv.innerHTML = `<span class="text-yellow-700 font-semibold">Parcialmente correcto (${correctCount}/${totalParts} partes correctas. +${questionScore.toFixed(1)} puntos)</span>`;
        feedbackDiv.className = "mt-2 p-3 rounded-md bg-yellow-100";
    } else {
        feedbackDiv.innerHTML = `<span class="text-red-700 font-semibold">Incorrecto. Revisa la sintaxis y los comandos. (+0 puntos)</span>`;
        feedbackDiv.className = "mt-2 p-3 rounded-md bg-red-100";
    }

    updateProgressBar();
}

// Función para calcular la nota final
function calculateFinalGrade() {
    console.log("=== Iniciando cálculo de nota final ===");

    let totalScore = 0;
    let resultsHTML = "";
    let totalPossible = 0;
    const totalQuestions = 30;

    const questionNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    questionNumbers.forEach((i, index) => {
        const questionId = `q${i}`;
        if (!verified[questionId]) {
            checkAnswer(i);
        }
        totalPossible += pointValues[questionId] || 0;
        const questionScore = results[questionId] || 0;
        totalScore += questionScore;

        resultsHTML += `<div class="flex justify-between items-center p-2 border-b border-gray-200">
            <div class="font-medium">Pregunta ${index + 1} (Q${i}):</div>
            <div>${questionScore.toFixed(1)} / ${pointValues[questionId] || 0} puntos</div>
        </div>`;
    });

    const resultsDetailsEl = document.getElementById('results-details');
    if (resultsDetailsEl) {
        resultsDetailsEl.innerHTML = resultsHTML;
        console.log("Detalles de resultados actualizados");
    } else {
        console.error("ERROR: No se encontró el elemento 'results-details'");
    }

    const percentage = totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0;
    let gradeMessage = "";

    if (percentage >= 90) gradeMessage = "¡Excelente trabajo!";
    else if (percentage >= 80) gradeMessage = "¡Muy bien!";
    else if (percentage >= 70) gradeMessage = "Buen trabajo";
    else if (percentage >= 60) gradeMessage = "Aprobado, ¡sigue practicando!";
    else gradeMessage = "Necesitas repasar más los conceptos";

    const nombreEl = document.getElementById('nombre');
    const apellidosEl = document.getElementById('apellidos');
    const emailEl = document.getElementById('email');

    const nombre = (nombreEl && nombreEl.value.trim()) || "Estudiante";
    const apellidos = (apellidosEl && apellidosEl.value.trim()) || "";
    const email = (emailEl && emailEl.value.trim()) || "";
    const fullName = `${nombre} ${apellidos}`.trim() || "Estudiante";

    console.log("Nombre del estudiante:", fullName);
    console.log("Email del estudiante:", email);

    const scoreDisplayEl = document.getElementById('score-display');
    if (scoreDisplayEl) {
        scoreDisplayEl.innerHTML = `
            <strong>${fullName}</strong><br>
            ${gradeMessage}<br>
            Puntaje Total: ${totalScore.toFixed(1)} / ${totalPossible} puntos<br>
            Porcentaje: ${percentage.toFixed(1)}%
        `;
        console.log("Display de puntaje actualizado para:", fullName);
    } else {
        console.error("ERROR: No se encontró el elemento 'score-display'");
    }

    // Enviar resultados por correo
    const emailNotificationEl = document.getElementById('email-notification');
    if (email) {
        sendResultsByEmail(fullName, email, totalScore, totalPossible, percentage);
    } else {
        if (emailNotificationEl) {
            emailNotificationEl.innerHTML =
                '<p class="text-yellow-600 font-medium">⚠ No se ha proporcionado correo electrónico. Los resultados no se han enviado.</p>';
            console.log("Notificación: No se proporcionó email");
        }
    }

    console.log("Total score:", totalScore.toFixed(1), "/", totalPossible);
    console.log("Percentage:", percentage.toFixed(1) + "%");

    const resultsEl = document.getElementById('results');
    if (resultsEl) {
        resultsEl.style.cssText = 'display: block !important;';
        resultsEl.classList.remove('hidden');
        console.log("Div 'results' mostrado correctamente");
        console.log("Display style:", window.getComputedStyle(resultsEl).display);
        setTimeout(() => {
            resultsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
    } else {
        console.error("ERROR: No se encontró el elemento 'results'");
        alert("Error: No se puede mostrar los resultados. Verifica la consola del navegador.");
    }

    console.log("=== Cálculo completado ===");
}

// Función para actualizar la barra de progreso
function updateProgressBar() {
    const totalQuestions = 30;
    const verifiedCount = Object.keys(verified).length;
    const progressPercentage = totalQuestions > 0 ? (verifiedCount / totalQuestions) * 100 : 0;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${Math.round(progressPercentage)}% Verificado`;
    }
}

// Función para enviar resultados por correo
function sendResultsByEmail(studentName, studentEmail, score, totalPossible, percentage) {
    // Datos para el envío
    const emailData = {
        studentName: studentName,
        studentEmail: studentEmail,
        score: score.toFixed(1),
        totalPossible: totalPossible,
        percentage: percentage.toFixed(1),
        recipients: ["johnclases@gmail.com", "jestrada@ces.edu.co"]
    };

    // Simulación de envío de correo (en producción, esto se enviaría a un backend)
    console.log("Enviando resultados por correo a:", emailData.recipients);
    console.log("Datos del estudiante:", emailData);

    // Notificar al usuario que se ha enviado el correo
    const emailNotificationEl = document.getElementById('email-notification');
    if (emailNotificationEl) {
        const emailStatus = document.createElement('div');
        emailStatus.innerHTML = `<p class="text-green-600 font-semibold">✓ Los resultados han sido enviados a ${emailData.recipients.join(' y ')}</p>`;
        emailNotificationEl.appendChild(emailStatus);
    }
}

// Hacer los placeholders editables
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.code-placeholder').forEach(placeholder => {
        placeholder.dataset.placeholder = '[...]';

        placeholder.addEventListener('focus', function() {
            if (this.textContent === this.dataset.placeholder) {
                this.textContent = "";
            }
            this.style.minWidth = '40px';
        });

        placeholder.addEventListener('blur', function() {
            if (this.textContent.trim() === "") {
                this.textContent = this.dataset.placeholder;
            }
            this.style.minWidth = '20px';
        });

        if (placeholder.textContent.trim() === '') {
            placeholder.textContent = placeholder.dataset.placeholder;
        }
    });

    // Inicializar barra de progreso
    updateProgressBar();
});

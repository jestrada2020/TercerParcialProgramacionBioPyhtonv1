// Objeto para almacenar los resultados y estado de verificaciÃ³n
        const results = {};
        const verified = {};
        
        // FunciÃ³n para verificar una respuesta individual
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
                feedbackDiv.innerHTML = `<span class="text-green-700 font-semibold">Â¡Correcto! (+${pointValues[questionId]} puntos)</span>`;
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

        // FunciÃ³n para calcular la nota final
        function calculateFinalGrade() {
            let totalScore = 0;
            let resultsHTML = "";
            let totalPossible = 0;
            const totalQuestions = 30;

            const questionNumbers = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 16, 18, 20, 21, 22, 24, 25, 29, 30, 32, 35, 37, 38, 39, 42, 43, 47, 49];
            
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

            document.getElementById('results-details').innerHTML = resultsHTML;

            const percentage = totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0;
            let gradeMessage = "";

            if (percentage >= 90) gradeMessage = "Â¡Excelente trabajo!";
            else if (percentage >= 80) gradeMessage = "Â¡Muy bien!";
            else if (percentage >= 70) gradeMessage = "Buen trabajo";
            else if (percentage >= 60) gradeMessage = "Aprobado, Â¡sigue practicando!";
            else gradeMessage = "Necesitas repasar mÃ¡s los conceptos";

            const nombre = document.getElementById('nombre').value || "Estudiante";
            const apellidos = document.getElementById('apellidos').value || "";
            const email = document.getElementById('email').value || "";
            const fullName = `${nombre} ${apellidos}`.trim();

            document.getElementById('score-display').innerHTML = `
                <strong>${fullName}</strong><br>
                ${gradeMessage}<br>
                Puntaje Total: ${totalScore.toFixed(1)} / ${totalPossible} puntos<br>
                Porcentaje: ${percentage.toFixed(1)}%
            `;

            // Enviar resultados por correo
            if (email) {
                sendResultsByEmail(fullName, email, totalScore, totalPossible, percentage);
            } else {
                document.getElementById('email-notification').innerHTML = 
                    '<p class="text-yellow-600 font-medium">â No se ha proporcionado correo electrÃ³nico. Los resultados no se han enviado.</p>';
            }

            document.getElementById('results').style.display = 'block';
            document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
        }

        // FunciÃ³n para actualizar la barra de progreso
        function updateProgressBar() {
            const totalQuestions = 30;
            const verifiedCount = Object.keys(verified).length;
            const progressPercentage = totalQuestions > 0 ? (verifiedCount / totalQuestions) * 100 : 0;
            const progressBar = document.getElementById('progress-bar');
            progressBar.style.width = `${progressPercentage}%`;
            progressBar.textContent = `${Math.round(progressPercentage)}% Verificado`;
        }

        // FunciÃ³n para enviar resultados por correo
        function sendResultsByEmail(studentName, studentEmail, score, totalPossible, percentage) {
            // Datos para el envÃ­o
            const emailData = {
                studentName: studentName,
                studentEmail: studentEmail,
                score: score.toFixed(1),
                totalPossible: totalPossible,
                percentage: percentage.toFixed(1),
                recipients: ["johnclases@gmail.com", "jestrada@ces.edu.co"]
            };
            
            // SimulaciÃ³n de envÃ­o de correo (en producciÃ³n, esto se enviarÃ­a a un backend)
            console.log("Enviando resultados por correo a:", emailData.recipients);
            console.log("Datos del estudiante:", emailData);
            
            // Notificar al usuario que se ha enviado el correo
            const emailStatus = document.createElement('div');
            emailStatus.innerHTML = `<p class="text-green-600 font-semibold">â Los resultados han sido enviados a ${emailData.recipients.join(' y ')}</p>`;
            document.getElementById('email-notification').appendChild(emailStatus);
        }

        // Hacer los placeholders editables
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
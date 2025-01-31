let questions = []

// Postman
const myHeaders = new Headers();
myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucHF3dm5kZWFnc2pkanZ0dHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNDI2OTAsImV4cCI6MjA1MzcxODY5MH0.SVwuKjJoad7_mTej9RkP6VRdoU-ZDDCrEoCopqgU794");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://anpqwvndeagsjdjvttyp.supabase.co/rest/v1/questions", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    questions = result;
    printQuestion()
  })
  .catch((error) => console.error(error));

let currentQuestion = 0;
let isAnswered = false;

// Timer
const totalTimer = 30;
let timer = 30;
let intervalID;

// Resultados
let score = 0;

const title = document.getElementById("question");
const answerBox = document.getElementById("answerBox");
const infoQuestion = document.getElementById("infoQuestion");
const btnNext = document.getElementById("btnNext");
const txtTimer = document.getElementById("txtTimer");
const progressBar = document.getElementById("progressBar");

function printQuestion() {
  // Pintar el título de la pregunta
  title.innerText = questions[currentQuestion].question;

  // De la pregunta actual
  let questionAnswers = questions[currentQuestion].answers;

  // Desordena las respuestas para que no estén siempre en el mismo orden
  questionAnswers.sort(() => Math.random() - 0.5);

  // Antes de pintar las nuevas respuestas, se borra el contenido del div
  answerBox.innerHTML = "";

  // Se generan los botones de respuesta
  questionAnswers.forEach((answer, index) => {
    answerBox.innerHTML += `<button
        id="btn${index}"
        onclick="checkAnswer('${answer}', 'btn${index}')"
        class="answer-btn"
      >
        ${answer}
      </button>`;
  });

  // El botón de siguiente se deshabilita
  btnNext.disabled = true;

  printInfoQuestion();
}

function checkAnswer(answer, btnId) {
  if (!isAnswered) {
    // Cada vez que se pulse y no se haya pulsado antes
    isAnswered = true;

    // El botón de siguiente se habilita
    btnNext.disabled = false;

    const currentCorrectAnswer = questions[currentQuestion].correctAnswer;
    const isCorrect = answer === currentCorrectAnswer;
    if (isCorrect) {
      score += timer;
      localStorage.setItem("score", score);
    }

    // Determina la clase de color según la respuesta
    const className = isCorrect ? "correct" : "incorrect";

    // Añade la clase correcta o incorrecta al botón seleccionado
    const btnElement = document.getElementById(btnId);
    btnElement.classList.remove("answer-btn");
    btnElement.classList.add(className);

    // Deshabilitamos todos los botones (evitar selección repetida)
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach(button => {
      button.disabled = true;
      if (button.innerText === currentCorrectAnswer) {
        button.classList.add("correct");
      }
    });
  }
}

function nextQuestion() {
  if (isAnswered) {
    currentQuestion++;

    // Si se han respondido todas las preguntas, redirige al ranking
    if (currentQuestion === questions.length) {
      window.location = "ranking.html";
    } else {
      isAnswered = false;
      printQuestion();

      // Reinicializamos el contador (timer a 30s + 1)
      timer = totalTimer + 1;
      // Arrancamos de nuevo el contador
      intervalID = setInterval(countdown, 1000);
    }
  }
}

function printInfoQuestion() {
  infoQuestion.innerText = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
}

function countdown() {
  timer -= 1;
  txtTimer.innerText = `${timer}`;

  // Muestra el progreso del tiempo
  const widthPercent = getPercent(timer);
  progressBar.style.width = `${widthPercent}%`;

  if (isAnswered || timer === 0) {
    // Parar el contador
    clearInterval(intervalID);

    // Si no se ha respondido, forzar la respuesta incorrecta
    isAnswered = true;
    btnNext.disabled = false;

    if (timer === 0) {
      // alert("Tiempo finalizado");
    }
  }
}

function getPercent(currentTime) {
  return (currentTime * 100) / totalTimer;
}

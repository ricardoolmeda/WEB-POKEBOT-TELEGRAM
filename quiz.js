const questions = [
    {
      id: 1,
      question: "What is the fire-type starter Pokémon in the Kanto region?",
      answers: ["Charmander", "Squirtle", "Bulbasaur", "Pikachu"],
      correctAnswer: "Charmander",
    },
    {
      id: 2,
      question: "Which Pokémon is known as the 'Mouse Pokémon'?",
      answers: ["Rattata", "Sandshrew", "Pikachu", "Raichu"],
      correctAnswer: "Pikachu",
    },
    {
      id: 3,
      question: "What is the name of the Water-type evolution of Eevee?",
      answers: ["Vaporeon", "Jolteon", "Flareon", "Espeon"],
      correctAnswer: "Vaporeon",
    },
    {
      id: 4,
      question: "Which type of Pokémon is strong against Grass-type Pokémon?",
      answers: ["Fire", "Water", "Electric", "Normal"],
      correctAnswer: "Fire",
    },
  ];
  

let currentQuestion = 0;

const title = document.getElementById("question");
const answerBox = document.getElementById("answerBox");
const infoQuestion = document.getElementById("infoQuestion");

function printQuestion() {
    // Pintar el título de la pregunta
    title.innerText = questions[currentQuestion].question;

    // De la pregunta actual
    let questionAnswers = questions[currentQuestion].answers;

    // Desordena las respuestas para que no estén siempre en el mismo orden
    questionAnswers.sort(() => Math.random() - 0.5);

    // Antes de pintar las NUEVAS respuestas, se borra el contenido del div
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

    printInfoQuestion();
}

function checkAnswer(answer, btnId) {
    const currentCorrectAnswer = questions[currentQuestion].correctAnswer;

    // Determina la clase de color según la respuesta
    const className = answer == currentCorrectAnswer ? "correct" : "incorrect";

    // Aquí eliminamos la clase original y añadimos la nueva clase según la respuesta
    document.getElementById(btnId).classList.remove("answer-btn");
    document.getElementById(btnId).classList.add(className);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        printQuestion();
    } else {
        alert("Quiz terminado");
    }
}

function printInfoQuestion() {
    infoQuestion.innerText = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
}

printQuestion();

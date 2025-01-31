const textScore = document.getElementById("textScore");

const scoreActual = localStorage.getItem("score");
textScore.innerText = `¡Has conseguido ${scoreActual} puntos!`;
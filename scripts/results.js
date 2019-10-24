const printingResults = () => {
  const correctAnswers = sessionStorage.correctAnswers;
  document.getElementById("result").innerHTML = correctAnswers + " de 3";
  if (sessionStorage.categoria == 1) {
    switch (correctAnswers) {
      case "0":
        document.getElementById("textResult").innerHTML = "Te falta ver mas cine";
        document.getElementById("animation").src = "images/movies0.gif";
        break;
      case "1":
        document.getElementById("textResult").innerHTML = "Algo es algo";
        document.getElementById("animation").src = "images/movies1.gif";
        break;
      case "2":
        document.getElementById("textResult").innerHTML = "Eres todo un cinéfilo";
        document.getElementById("animation").src = "images/movies2.gif";
        break;
      case "3":
        document.getElementById("textResult").innerHTML = "Eres un verdadero experto del séptimo arte!";
        document.getElementById("animation").src = "images/movies3.gif";
        break;
    }
  } else {
    switch (sessionStorage.correctAnswers) {
      case "0":
        document.getElementById("textResult").innerHTML = "Te falta garnacha";
        document.getElementById("animation").src = "images/food0.gif";
        break;
      case "1":
        document.getElementById("textResult").innerHTML = "Sabes de taquitos ;)";
        document.getElementById("animation").src = "images/food1.gif";
        break;
      case "2":
        document.getElementById("textResult").innerHTML = "Tú sabes a donde ir  cenar ;)";
        document.getElementById("animation").src = "images/food2.gif";
        break;
      case "3":
        document.getElementById("textResult").innerHTML = "Eres el rey de la garnacha";
        document.getElementById("animation").src = "images/food3.gif";
        break;
    }
  }


}

const sendBack = () => {
  window.location.href = "category.html"
}
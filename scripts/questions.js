//Variables para el cronometro
const aux = 15;
let timer;
let time = aux;

let counter = 1;
let score = 0;
let saveSelection = 1;

let randomQuestions = [];
let myJSON;

function loadJSON(dir, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", dir, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

const getReady = () => {
  //Hacer el random para seleccionar las preguntas, cargar JSON correspondiente y mandar llamar la funcion de llenado doingMagic.
  document.getElementById("showTimer").innerHTML="Tiempo restante: " + aux + " segundos.";
  let route;
  let cycle;
  let position;
  let options = [1, 2, 3, 4, 5, 6];
  for (cycle = 0; cycle < 3; cycle++) {
    position = Math.floor(Math.random() * options.length);
    randomQuestions.push(options[position]);
    options.splice(position, 1);
  }

  route = sessionStorage.categoria == 1 ? "/Data/moviesCategory.json" : "/Data/foodCategory.json";

  loadJSON(route,function (response) {
    // Parse JSON string into object
    myJSON = JSON.parse(response);
    console.log(myJSON.questions[0].question);
    doingMagic();
  });
}


const doingMagic=()=>{
  //Formato botones y contador de pregunta
  document.getElementById("bOption"+saveSelection).style.background="#0BACAC";
  document.getElementById("answer").style.visibility="hidden";
  document.getElementById("bNext").style.visibility="hidden";
  document.getElementById("bAnswer").style.visibility="hidden";
  document.getElementById("questionNum").innerHTML = counter + " de 3";

  //Llenado de campos
  let position = randomQuestions[counter-1] - 1;
  document.getElementById("question").innerHTML = myJSON.questions[position].question;
  document.getElementById("bOption1").innerHTML = myJSON.questions[position].answers[0];
  document.getElementById("bOption2").innerHTML = myJSON.questions[position].answers[1];
  document.getElementById("bOption3").innerHTML = myJSON.questions[position].answers[2];
  document.getElementById("bOption4").innerHTML = myJSON.questions[position].answers[3];


  setTimer();
}

const setTimer=()=>{
  timer = setInterval(timeUP,1000);
}

const timeUP=()=>{
  time--;
  document.getElementById("showTimer").innerHTML="Tiempo restante: " + time + " segundos.";

  if (time==-1){
    document.getElementById("showTimer").innerHTML="Tiempo restante: 0 segundos.";
    document.getElementById("bOption1").disabled = true;
    document.getElementById("bOption2").disabled = true;
    document.getElementById("bOption3").disabled = true;
    document.getElementById("bOption4").disabled = true;
    document.getElementById("bNext").style.visibility="visible";
    document.getElementById("bAnswer").style.visibility="visible";
    clearInterval(timer);
    //alert("Se termino el tiempo, intenta con la siguiente pregunta");

    Swal.fire({
      type: 'error',
      title: 'Time Up!',
      text: "Intenta con la siguiente pregunta.",
    })
  }
}

const setScore=(selection)=>{
  let position = randomQuestions[counter-1] - 1;
  clearInterval(timer);

  if (selection == myJSON.questions[position].correct){
    score++;
    document.getElementById("bOption"+selection).style.background="#4CAF50";
  } else{
    document.getElementById("bAnswer").style.visibility="visible";
    document.getElementById("bOption"+selection).style.background="#F3260B";
  }
  //Formato de botones
  document.getElementById("bOption1").disabled = true;
  document.getElementById("bOption2").disabled = true;
  document.getElementById("bOption3").disabled = true;
  document.getElementById("bOption4").disabled = true;
  document.getElementById("bNext").style.visibility="visible";
  saveSelection = selection;
}

const showAnswer=()=>{
  let position = randomQuestions[counter-1] - 1;
  let answerNum = myJSON.questions[position].correct- 1;
  document.getElementById("answer").innerHTML= myJSON.questions[position].answers[answerNum];
  document.getElementById("answer").style.visibility="visible"; 
}

const goToResults=()=>{
  if (counter < 3){
    counter++;
    doingMagic();
  } else{
    sessionStorage.setItem("correctAnswers", score);
    window.location.href = "results.html";
  }
  time = aux;
  document.getElementById("showTimer").innerHTML="Tiempo restante: "+aux+" segundos.";
  document.getElementById("bOption1").disabled = false;
  document.getElementById("bOption2").disabled = false;
  document.getElementById("bOption3").disabled = false;
  document.getElementById("bOption4").disabled = false;
}
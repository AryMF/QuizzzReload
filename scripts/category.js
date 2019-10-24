const getName=()=> {
  console.log(sessionStorage.getItem("userName"));
  document.getElementById("welcomeText").innerHTML = "Hola " + sessionStorage.userName + "!";
}

const setCategory=(num)=>{
  sessionStorage.setItem("categoria", num);
  window.location.href = "questions.html";
}
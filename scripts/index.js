const setFocuseOn=()=>{
  document.getElementById("textBox").focus();
}

const sendName=()=>{
    if (document.getElementById("textBox").value != ""){
      let value = document.getElementById("textBox").value;
      sessionStorage.setItem("userName", value); //Almacenar nombre
      window.location.href = "category.html"
    } else {
      alert("Introduce tu nombre para poder continuar.");
    }
}
var form = document.getElementById("loginForm");
var snackBar = document.getElementById("snackbar");

function toast() {
  // Get the snackbar DIV
  // Add the "show" class to DIV
  snackBar.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    snackBar.className = snackBar.className.replace("show", "");
  }, 3000);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
    var id = document.getElementById("email").value;
         var pwd = document.getElementById("password").value;
     const params = {
   id,
   pwd
  };
  const http = new XMLHttpRequest();
  http.open("POST", "http://127.0.0.1:4000/user/login");
  http.setRequestHeader("Content-type", "application/json");
  console.log(JSON.stringify(params))
  http.send(JSON.stringify(params));
  http.onload = function () {
  console.log(http.responseText);
  if(http.responseText==="true"){
    snackBar.innerText = `Login Successful !`;
    toast();
    window.location.replace("./index.html")
  }
  else{
    snackBar.innerText = `Please check your email id or password`;
    toast();
    document.getElementById("loginForm").reset();
  }
  
//   ;
  }
        // 
     
        
  
    
});




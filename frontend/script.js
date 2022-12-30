var form = document.getElementById("form");
var snackBar = document.getElementById("snackbar");
//Password Verification Function
var checkPwd = (str) => {
  if (
    str.length < 6 ||
    str.length > 50 ||
    str.search(/\d/) == -1 ||
    str.search(/[a-zA-Z]/) == -1 ||
    str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1
  ) {
    return false;
  } else {
    return true;
  }
};

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
  var fName = document.getElementById("fName").value;
  var lName = document.getElementById("lName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var textArea = document.getElementById("textArea").value;
  if (fName.trim() == "") {
    snackBar.innerText = "Name cannot be blank";
    toast();
  } else {
    if (checkPwd(password)) {
      if (password == confirmPassword) {
        console.log(fName);
        console.log(lName);
        console.log("Password Verification Passed");
        console.log(textArea);

        const params = {
          fName,
          lName,
          email,
          password,
          textArea,
        };
        console.log(params);
        const http = new XMLHttpRequest();
        http.open("POST", "http://127.0.0.1:4000/user/register");
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(params));
        http.onload = function () {
          snackBar.innerText = `${http.response}`;
          toast();
        };
        document.getElementById("form").reset();
      } else {
        snackBar.innerText = "Password match failed";
        toast();
      }
    } else {
      snackBar.innerText =
        "Password must contain 1 Special, 1 Number, 1 Upper and 1 Lower case letter";
      toast();
    }
  }
});

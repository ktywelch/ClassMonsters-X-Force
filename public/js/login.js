  let userInput, passwordInput;

document.addEventListener('DOMContentLoaded', (event) => {
  // Getting references to our form and inputs
  
  var loginBtn = document.querySelector("#loginBtn");

  loginBtn.addEventListener('click', (e) => {
  //loginForm.on("submit", function(event) {
    e.preventDefault();
    userInput = document.querySelector('#userID');
    passwordInput = document.querySelector("#password");
    loginUser(userInput.value,passwordInput.value);
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(userid, password) {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userid,
        password: password
        })
      })
      .then((data) => {
        console.log(data);
        if(data.url.includes("login")){
        alert("Invalid Credentals Provided"); 
        if(data.url)
        window.location.href="/"} else {
          window.location.href=data.url  
        }  
      })
      .catch(function(err) {
        console.log(err);
      });

  }
});

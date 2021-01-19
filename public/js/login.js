document.addEventListener('DOMContentLoaded', (event) => {
  // Getting references to our form and inputs
  var loginForm = document.querySelector('#loginForm')
  
  var loginBtn = document.querySelector("#loginBtn");

  loginBtn.addEventListener('click', (e) => {
  //loginForm.on("submit", function(event) {
    e.preventDefault();
    var userInput = document.querySelector('#userID');
    var passwordInput = document.querySelector("#password");
    loginUser(userInput.value,passwordInput.value);
    userInput.value="";
    passwordInput.value="";
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
        if(data.url){
        window.location.href=data.url
        } else {
          console.log("need to add message here")
        }

      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

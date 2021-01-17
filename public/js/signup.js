$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

function firstPage (){
  let signup = document.querySelector('#signup');
  let newD = document.createElement("div");
     newD.setAttribute("id","generalInfo");
     newD.setAttribute("class","row")
	   newD.innerHTML = `<div class="col-md-12 col-sx-6">
     <div class="row">
           <div class="card-body m-4 border border-danger lead">
              <div class="float-md-left">
                <img src="./assets/images/logo.JPG" alt="Logo Picture" 
                   class="p-3 img-responsive float-md-left float-sm-left rounded-circle w-25" 
                   />
                <h5 class="card-title">About this program</h5>
                <div class="text-left" >
                 This application is designed to help teachers have check in with the students so they 
                 can determine how the child is feeling. How many times the child has missed logging into the 
                 virtual classroom and how many times the teacher has called on a specific student.
                 </div>
                 <div class="p-3" > 
                 To register in the virtual check-in system please contact us. We will need to work with you and 
                 your school to create your inital logins. Once the teachers and students have been on boarded teachers will 
                 have the ability to add students to their class or move students to another teacher.
                 </div>
                 <div class="p-3" >     
                 Please contact us at <div id="contactUs">Contact place holder</div>
               </div>
          </div>
        </div>
     </div>
 </div>`
	  signup.appendChild(newD);


}

firstPage ();
/*
<div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h2 >Sign Up Form</h2>
        <form class="signup">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="email-input" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="password-input" placeholder="Password">
          </div>
          <div style="display: none" id="alert" class="alert alert-danger" role="alert">
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span class="sr-only">Error:</span> <span class="msg"></span>
          </div>
          <button type="submit" class="btn btn-default">Sign Up</button>
        </form>
        <br />
        <p>Or log in <a href="/login">here</a></p>
      </div>
    </div>
    */

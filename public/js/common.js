// this function get the userid parameter will change when we use auth
const getParams = () => {var url_det = document.URL.indexOf('?');
var params = new Array();
if ( url_det  != -1) {
//splits to an array called pairs all of the variable & as seperator  
var pairs = document.URL.substring(url_det+1, document.URL.length).split('&');
for (var i=0; i<pairs.length; i++) {
nameVal = pairs[i].split('=');
params[nameVal[0]] = nameVal[1];
  }
}
return params;
}

// Show an element 
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// This is used to reset the messages view - since we have message modal here added it to the common page
const resetView = () => {
  messSubject.style.display =  'none';
  messText.style.display =  'none';
  messFrom.style.display =  'none';
  messTo.style.display = 'none';
  messSubject.value = "";
  messText.value = "";
  messFrom.value = "";
  // will take care of this one later///
  uid=myId;
}

//This one is to get the name and basic information on user by id
const getUserInfo = async (id,cb) =>{
  await fetch(`/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  }).then((userInfo) => {
    cb(userInfo); 
  })
}

// get messages for the user and sets an alert and sets up a listener when there are messages
const getMess = (id) =>{
  fetch(`/api/messages/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json();
  }).then((messages) => { 
    if(messages.length > 0 ){
      newMessageAlert = document.querySelector('#msg-alert');
      show(newMessageAlert); 
      } else {
      hide(newMessageAlert);
      } 
    newMessageAlert.addEventListener("click", (e) =>{
      e.preventDefault();
      showMessCenter();
    });
    //If there is a message or not we are adding a listener
    messBtn.addEventListener('click', (e) => handleMessBtn(e,uid));
  }).catch(err => console.error(err))
};

const showMessCenter = () =>{
           
        // this is how message pops happen - will need to update the modal 
        $('#messModal').modal('show')

        //if we close the modal want to reset the values and reload to prevent data in fileds 
       $("#messModal").on('hide.bs.modal', function() { 
           //alert('The modal is about to be hidden.'); 
           resetView();
           location.reload();
       })
}

//this one is in the student rouces and takes a JSON string to update values for any user
const updateUser = async (jsonUser, cb) => {
  fetch(`/api/students/${uid}`, {
    method: "PUT",
    headers: {
        'Content-Type': 'application/json',
    },
    body: jsonUser,
  }).then((response) => {
      cb(response)
  })
}

//this one we are going to move
const logout = () => {
  
}

let newMessages, newMessageAlert,sendMessageBtn, newMessageCreateBtn;
let messCreateFrom, messChanged,params,messList;
let messIdLoc = document.querySelector('.message-id');
let messSubject = document.querySelector('.message-subject')
let messText = document.querySelector('.message-textarea');
let messFrom = document.querySelector('.message-from')
messList = document.querySelectorAll('.list-container .list-group');
let lname,fname,role,full_name;

/// The message handling is based on the note taker 
const handleMessView = (e) => {
  e.preventDefault();
  console.log("clicked on message",e.target)
  activeMess = JSON.parse(e.target.parentElement.getAttribute('data-message'));
  renderActiveMess();
  //added this so that either new note or changed note after save will return a blank new note
  activeMess = {};
};

const renderActiveMess = () => {  
  if (activeMess.id) {
    messIdLoc.setAttribute('readonly', true)
    messSubject.setAttribute('readonly', true);
    messText.setAttribute('readonly', true);
    messFrom.setAttribute('readonly', true);
    messIdLoc.value = activeMess.id
    messSubject.value = activeMess.subject;
    messText.value = activeMess.message;
  } else {
    messIdLoc.value = '';
    messSubject.value = '';
    messText.value = '';
  }
};

const handleMessDelete = (e) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const message = e.target;
  console.log(message);
  //activeMess = JSON.parse(e.target.parentElement.getAttribute('data-message'));
  const messId = JSON.parse(message.parentElement.getAttribute('data-message')).id;

  console.log("mess",message,messId)

  if (activeNote.id === messId) {
    activeNote = {};
  }

  deleteMess(messId).then(() => {
    activeMess = {};
    getAndRenderMess();
    renderActiveMess();
  });
};


const getAndRendMessages = async = (id) => {
  fetch(`/api/messages/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
 .then((messages) = async(messages) => {
  let jsonMess = await messages.json();
  if (window.location.pathname === '/teacher' || window.location.pathname === '/student' ) {
    messList.forEach((el) => (el.innerHTML = ''));
  }
  let messListItems = [];

  // Returns HTML element with or without a delete button
    const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleMessView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas','fa-trash-alt','float-right','text-danger','delete-note');
      delBtnEl.addEventListener('click', handleMessDelete);

      liEl.append(delBtnEl);
    }
    return liEl;
  };

  if (jsonMess.length === 0) {
    messListItems.push(createLi('No Messages', false));
  }

  jsonMess.forEach((message) => {
    const li = createLi(message.subject);
    li.dataset.message = JSON.stringify(message);
    messListItems.push(li);
  });

  if (window.location.pathname === '/teacher') {
    messListItems.forEach((message) => messList[0].append(message));
  }
});
}



const updMessages = (id,cb) =>
 fetch(`/api/messages/:${id}`, {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
   },
 }).then((data) => {
   cb(data.json())
});



const handleRenderMsgAlert = () => {
  newMessageAlert = document.querySelector("#")
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};


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
      console.log("been clicked")
      // this is how message pops happen - will need to update the modal 
      $('#messModal').modal('show')
    })
  return res.body;
  }).catch(handleLoginErr);
};

const getUserInfo = (id,cb) =>{
  fetch(`/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
}).then((res) => {
  return res.json();
}).then((userInfo) => {
  console.log(userInfo)
  cb(userInfo); 
 })
}


const handleLoginErr = (err) => {
  console.log({"msg": err.responseJSON});
}

//main
params = getParams();
uid = params.uid;
getUserInfo(uid, user => {
  lname = user.last_name;
  fname = user.first_name;
  fn_loc = document.querySelector('#user_full_name');
  fn_loc.innerText = `${fname} ${lname}`

});
 
if (window.location.pathname === '/teacher') {
    getMess(uid);
    getAndRendMessages(uid)
}
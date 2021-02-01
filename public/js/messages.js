// Sets the activeMessage and displays it
/*  --- These attributes need to be set by the calling script 
let newMessages, newMessageAlert,sendMessageBtn, newMessageCreateBtn;
let messCreateFrom, messChanged,params;
let messIdLoc = document.querySelector('.message-id');
let messSubject = document.querySelector('.message-subject')
let messText = document.querySelector('.message-textarea');
let messFrom = document.querySelector('.message-from')
let messBtn = document.querySelector('#messBtn');
let messList = document.querySelectorAll('.list-container .list-group');
*/

//Calls the fetchto delete the message from the DB - renders and refetches afer delete
const deleteMess = (id) => 
{ fetch(`/api/messages/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
}).then(() => {
  console.log("Message Deleted")
  getAndRendMessages(uid);
});
};

const sendMess = () => {
  let subject =  messSubject.value;
  let message = messText.value;
  let msgJSON = JSON.stringify({
    subject:  subject,
    message: message,
    fromId: myId, 
    read: 0,
    toId:  toId
  })
  fetch(`/api/messages`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
      body: msgJSON
  }).then((res) => {
        //  console.log(res);
        //   resetView();
        //   getAndRendMessages(uid);
        //   messBtn.innerText = "New Message"
  }).catch((err) => console.error(err));
  ; 
}

/* assumes the mess locations are set by the main and chances when he user clicks on the subject they will be able to see the message 
deatils - the click/listener action is assigned to each message in generated list*/
const handleMessView = (e) => {
  e.preventDefault();
  messBtn = document.querySelector('#messBtn');
  activeMess = JSON.parse(e.target.parentElement.getAttribute('data-message'));
  messBtn.innerText = "Close Message"
  renderActiveMess();
  activeMess = {};
};


/* We have one button on the messages and the action changes based on the text value
THis function handles what happens when there is a click on the button.
*/
const handleMessBtn = (e,uid) => {
  //uid = myId;
  let  btnAction;
  if (typeof(e) !== 'string'){
  e.preventDefault();
  btnAction = messBtn.innerText;
  console.log(btnAction);
  } else {  btnAction = e;}
   switch (btnAction){
    case 'Close Message':  //this is reading 
        resetView();
        //*** Marking the messages as read ***/// 
        fetch(`/api/messages/${messIdLoc.value}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            read: 1
          })
         });
        messBtn.innerText = "New Message";  
       break;
    case 'New Message':
          messSubject.removeAttribute("readonly");
          messText.removeAttribute("readonly");
          messTo.style.display = 'initial';
          messSubject.style.display =  'initial';
          messText.style.display = 'initial';
          messBtn.innerText = "Send Message"
      break;
    case 'New Stu Message':
          let listGroup = document.querySelector('.list-group')
          listGroup.style.display =  'none';
          messSubject.removeAttribute("readonly");
          messText.removeAttribute("readonly");
          messSubject.style.display =  'initial';
          messText.style.display = 'initial';
          messTo.style.display =  'none';
          console.log(stuId);
          toId=stuId;
          messBtn.innerText = "Send and Close Messages"
      break;
    case 'Send Message':
        sendMess();
        messBtn.innerText = "Send Message"
        getAndRendMessages(uid);
        $('#messModal').modal('hide')
        break;
      case 'Send and Close Messages':
         sendMess();
         getAndRendMessages(uid);
         $('#messModal').modal('hide')
         break;
      case 'RenderActive':
        messBtn.innerText = "New Message";
        renderActiveMess ();
        break;
      default:
        console.log(e)
        messBtn.innerText = "New Message";
        break;
    }
};

// const sendMess = () => {
//   let subject =  messSubject.value;
//   let message = messText.value;
//   let msgJSON = JSON.stringify({
//     subject:  subject,
//     message: message,
//     fromId: myId, 
//     read: 0,
//     toId:  toId
//   })
//   fetch(`/api/messages`, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//       body: msgJSON
//   }).then((res) => {
//           resetView();
//           getAndRendMessages(uid);
//   }).catch((err) => console.error(err));
//   messBtn.innerText = "New Message"; 
// }

//This creates our message drop down button so we can select users to send message to 
const createMessageDropDown = () => {
  let dropSelection = `<div class="dropdown">
  <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" class="dropdown-toggle messTo" value="" style="display: none;">
  <span id="selected">Select Recipient</span><span class="caret"></span></a><ul class="dropdown-menu">`;
  let t = document.querySelector('.dropDownTo');
  let newD = document.createElement('div');
  fetch('/api/allnames', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {return res.json()})
    .then(allusers => {
      allusers.forEach(user => { 
      let currUser =  `<li><a class="nmli" id="${user.id}" value="${user.id}" >${user.first_name} ${user.last_name} - ${user.Role.name}</a></li>`;
      dropSelection += currUser;
      });
      dropSelection += '</ul></div>';
      newD.innerHTML = dropSelection;
      t.appendChild(newD);
      messTo = document.querySelector('.messTo');
      //Listeners for each user so we can select one from the list
      document.querySelectorAll('.nmli').forEach( (el) => { 
        el.addEventListener('click',() =>  {
            messTo.innerText = el.textContent;
            toId = el.id;
        });
    });
  }).catch(err => console.error(err))
  }
  


const renderActiveMess = () => {
  messText.style.display =  'initial';
  messFrom.style.display =  'initial';
  //hide(saveNoteBtn); 
  if (activeMess.id) {
    messIdLoc.setAttribute('readonly', true)
    messSubject.setAttribute('readonly', true);
    messFrom.setAttribute('readonly', true);
    messText.setAttribute('readonly', true);
    messIdLoc.value = activeMess.id
    messFrom.value = uid;
    messSubject.value = activeMess.subject;
    messText.value = activeMess.message;
    messFrom.value = activeMess.FromFullname;
  } else {
    messIdLoc.value = '';
    messSubject.value = '';
    messText.value = '';
    messFrom.value = '';
  }
};



const getAndRendMessages = async = (id) => {
  myId =id;
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
    const createLi = (text,read, delBtn = true) => {
    const liEl = document.createElement('li');
    if(read){
      liEl.style.color = "blue"
    } else {
      liEl.style.color = "green"
    }
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleMessView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas','fa-trash-alt','float-right','text-danger','delete-mess');
      delBtnEl.addEventListener('click', handleMessDelete);
      liEl.append(delBtnEl);
     //Adds the icon to tell if the
     const iconEnvEl = document.createElement('i');
       if(read){
        iconEnvEl.classList.add(
          'fas','fa-envelope-open','float-right','text-primary','delete-mess');
       } else{
        iconEnvEl.classList.add(
          'fas','fa-envelope','float-right','text-success','delete-mess');
       } 


        iconEnvEl.addEventListener('click', renderActiveMess);
      liEl.append(iconEnvEl);


    }

    return liEl;
  };

  if (jsonMess.length === 0) {
    messListItems.push(createLi('No Messages', false));
  }

  jsonMess.forEach((message) => {

    const li = createLi(message.subject,message.read);
    // this puts in JSON format with the existing li tag created with data above
    li.dataset.message = JSON.stringify(message);
    messListItems.push(li);
  });

  if (window.location.pathname === '/teacher' || window.location.pathname === '/student') {
    messListItems.forEach((message) => messList[0].append(message));
  }
});
createMessageDropDown();
}



const updMessages = (id,cb) =>
 {fetch(`/api/messages/${id}`, {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
   },
 }).then((data) => {
   cb(data.json())
});
};

const handleRenderMsgAlert = () => {
  newMessageAlert = document.querySelector("#")
  if (!messSubject.value.trim() || !messText.value.trim()) {
    hide(saveMessBtn);
  } else {
    show(saveMessBtn);
  }
};

const handleMessDelete = (e) => {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  e.preventDefault();
  const messId = JSON.parse(e.target.parentElement.getAttribute('data-message')).id;
  if (activeMess.id === messId) {
    messIdLoc.value = '';
    messSubject.value = '';
    messText.value = '';
    messFrom.value = '';
    $('#messModal').removeData('bs.modal')
  }
    deleteMess(messId).then(() => {
    activeMess={};
    getAndRenderMessages(uid);
    handleMessBtn("RenderActive",uid);
  });
};




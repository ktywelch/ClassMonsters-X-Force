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

// assumes the mess locations are set by the main..
const handleMessView = (e) => {
  e.preventDefault();
  let messBtn = document.querySelector('#messBtn');
  activeMess = JSON.parse(e.target.parentElement.getAttribute('data-message'));
  messBtn.innerText = "Close Message"
  renderActiveMess();
  activeMess = {};
};


const handleMessBtn = (e,uid) => {
  console.log("value of uid",uid);
  uid=myId;
  let  btnAction;
  if (typeof(e) !== 'string'){
  e.preventDefault();
  btnAction = messBtn.innerText;
  } else {  btnAction = "renderActive";}
   switch (btnAction){
    case 'Close Message':  
          messSubject.style.display =  'none';
          messText.style.display =  'none';
          messFrom.style.display =  'none';
          messTo.style.display = 'none';
          messSubject.value = "";
          messText.value = "";
          messFrom.value = "";
          messBtn.innerText = "New Message";
        //*** Marking the messages as read ***/// 
        fetch(`/api/messages/${messIdLoc.value}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            read: 1
          })
         });
       break;
    case 'New Message':
          messSubject.style.display =  'initial';
          messText.style.display = 'initial';
          messTo.style.display =  'initial';
          messBtn.innerText = "Send Message"
      break;
    case 'Send Message':
         console.log(uid);
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
                //console.log(res.json);
          }).catch((err) => console.error(err));
          messSubject.style.display =  'none';
          messText.style.display =  'none';
          messTo.style.display =  'none';
          messBtn.innerText = "New Message"
          getAndRendMessages(uid);
        break;
      case 'RenderActive':
        renderActiveMess ();
        break;
    }
  //activeMess = {};
};

const createMessageDropDown = () => {
  let dropSelection = `<div class="dropdown">
  <a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" class="dropdown-toggle messTo" value="" style="display: none;">
  <span id="selected">Chose Person</span><span class="caret"></span></a><ul class="dropdown-menu">`;
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
      let currUser =  `<li><a class="nmli" id="${user.id}" value="${user.id}" >${user.first_name} ${user.last_name}</a></li>`;
      dropSelection += currUser;
      });
      dropSelection += '</ul></div>';
      newD.innerHTML = dropSelection;
      t.appendChild(newD);
      messTo = document.querySelector('.messTo');
      document.querySelectorAll('.nmli').forEach( function(el) { 
        el.addEventListener('click', function() {
            console.log(el);
            messTo.innerText = el.textContent;
            toId = el.id;
            console.log("toID is ",toId)
        });
    });
  }).catch(err => console.error(JSON.parse(err)))
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
        'fas','fa-trash-alt','float-right','text-danger','delete-mess');
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
    // this outs in JSON format with the existing li tag created above
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
    handleMessBtn("render",uid);
  });
};




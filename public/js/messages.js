
// Sets the activeNote and displays it


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

const handleMessView = (e) => {
  e.preventDefault();
  activeMess = JSON.parse(e.target.parentElement.getAttribute('data-message'));
  renderActiveMess();
  activeMess = {};
};


const renderActiveMess = () => {
  //hide(saveNoteBtn);
  messIdLoc.value = '';
  messSubject.value = '';
  messText.value = '';
  messFrom.value = ''; 
  
  if (activeMess.id) {
    console.log(activeMess)
    messIdLoc.setAttribute('readonly', true)
    messSubject.setAttribute('readonly', true);
    messFrom.setAttribute('readonly', true);
    messText.setAttribute('readonly', true);
    messIdLoc.value = activeMess.id
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
    li.dataset.message = JSON.stringify(message);
    messListItems.push(li);
  });

  if (window.location.pathname === '/teacher' || window.location.pathname === '/student') {
    messListItems.forEach((message) => messList[0].append(message));
  }
});
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
  console.log("mess",messId)
  if (activeMess.id === messId) {
    activeMess = {};
  }
    deleteMess(messId).then(() => {
    activeMess={};
    getAndRenderMessages();
    renderActiveMess();
  });
};




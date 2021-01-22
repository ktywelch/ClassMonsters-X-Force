
// Sets the activeNote and displays it
const handleMessView = (e) => {
  e.preventDefault();
  console.log("clicked on message",e.target)
  activeMess = JSON.parse(e.target.parentElement.getAttribute('data-message'));
  renderActiveMess();
  //added this so that either new note or changed note after save will return a blank new note
  activeMess = {};
};


const renderActiveMess = () => {
  //hide(saveNoteBtn);

  
  if (activeMess.id) {
    messIdLoc.setAttribute('readonly', true)
    //noteTitle.setAttribute('readonly', true);
    //noteText.setAttribute('readonly', true);
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
  const messId = JSON.parse(note.parentElement.getAttribute('data-mess')).id;

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






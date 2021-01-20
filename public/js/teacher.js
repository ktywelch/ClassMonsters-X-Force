
let newMessages;
let newMessageAlert;
let snedMessageBtn;
let newMessageCreateBtn;
let messCreateFrom;
let messChanged;
let params;


const getParams = () => {   var idx = document.URL.indexOf('?');
    var params = new Array();
    if (idx != -1) {
    var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
    for (var i=0; i<pairs.length; i++) {
    nameVal = pairs[i].split('=');
    params[nameVal[0]] = nameVal[1];
       }
    }
    return params;
 }
params = getParams();
console.log(params.id);

if (window.location.pathname === '/teacher') {
    let navbar = document.querySelector('#navBar');
    navbar.textContent = "Classroom of " +  params.fname + " " + params.lname;
}

if (window.location.pathname === '/notes') {
  noteIdLoc = document.querySelector('.note-id');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};


const getNotes = (id) =>
  fetch(`/api/messages/:${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded')
})

const addTeacher = (teacherData) => {
    fetch ('/api/teachers', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherData)
    }).then(getTeacher)
        .catch((err) => console.error(err))
}

const getTeacher = () => {
    console.log('Get Teacher is getting called');
    fetch('/api/teachers', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        // .then((data) => {
        // // console.log('Success in getting authors:', authors);
        // const rowsToAdd = [];
        // for (let i = 0; i < data.length; i++) {
        //     rowsToAdd.push(createTeacherRow(data[i]));
        // }
        // renderTeacherList(rowsToAdd);
        // nameInput.value = '';
        // })
        // .catch((error) => console.error('Error:', error));
};


let newMessages;
let newMessageAlert;
let sendMessageBtn;
let newMessageCreateBtn;
let messCreateFrom, messChanged, params, uid;


const getParams = () => {   var idx = document.URL.indexOf('?');
    var params = new Array();
    if (idx != -1) {
    var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
    for (var i=0; i<pairs.length; i++) {
    nameVal = pairs[i].split('=');
    params[nameVal[0]] = nameVal[1];
        }
    }
    uid=params.uid;
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

    console.log(messages.length)
    
    if(messages.length > 0 ){
        newMessageAlert = document.querySelector('.new-msg');
        newMessageAlert.addEventListener("click", (e) =>{
        e.preventDefault();

        console.log("been clicked")

        let myModal = document.querySelector('#messModal')
        $('#messModal').modal('show')
        })
        show(newMessageAlert); 
    } else {
        hide(newMessageAlert);
    }
    return res.body;

    }).catch(handleLoginErr);
};


function handleLoginErr(err) {
    console.log({"msg": err.responseJSON});
}

//main
params = getParams();
if (window.location.pathname === '/student') {
    let navbar = document.querySelector('#navBar');
    navbar.textContent = "Student: " +  params.fname + " " + params.lname;
    getMess(uid);
}
console.log(params)



//Email
let studentEmail = document.querySelector("#studentEmail");
studentEmail.textContent = params.fname.charAt(0) + params.lname + "@theEmail.com"


//clickable character icon
//UPDATE: can potentially use modal to 1. change nickname, 2. update emergency contact, 3. update feelings...etc
let characterIcon = document.querySelector(".characterIcon");
characterIcon.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("character imaged clicked")
    $('#studModal').modal('show')
})

//NOTE: Edit nickname
let studentName = document.querySelector("#studentName");
let editNickname = document.querySelector("#editStudbtn")

studentName.textContent = params.lname
editNickname.addEventListener('click', (e) => {
    e.preventDefault();
    let name = document.getElementById("btn_text").value
    studentName.textContent = name;
    fetch(`/api/students/${uid}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            last_name: name
        })
    }).then((res) => {
        console.log(res.json)
    })
    .catch(err => {
        console.error(err);
    })

    location.reload()
})


//creating new messages
//UPDATE: work in progress
getParams();
let postMsg = document.getElementById("postMsg");

postMsg.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("clicked")

    
})

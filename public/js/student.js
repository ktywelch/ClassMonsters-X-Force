let newMessages;
let newMessageAlert;
let sendMessageBtn;
let newMessageCreateBtn;
let messCreateFrom, messChanged, params, uid;

let messIdLoc = document.querySelector('.message-id');
let messSubject = document.querySelector('.message-subject')
let messText = document.querySelector('.message-textarea');
let messFrom = document.querySelector('.message-from')
let messList = document.querySelectorAll('.list-container .list-group');
let lname,fname,role,full_name;


//Clickable icon to open modal
let characterIcon = document.querySelector(".characterIcon");
characterIcon.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("character imaged clicked")
    $('#studModal').modal('show')
})

//NOTE: Edit nickname
let studentName = document.querySelector("#studentName");
let editNickname = document.querySelector("#editStudbtn")

editNickname.addEventListener('click', (e) => {
    e.preventDefault();
    let newNickname = document.getElementById("btn_text").value
    console.log(newNickname)
    fetch(`/api/students/${uid}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nickname: newNickname
        })
    }).then((res) => {
        console.log(res.json)
    })
    .catch(err => {
        console.error(err);
    })
    location.reload();
})

const usersInfo = async () => {
    
    await getUserInfo(uid, user => {
        lname = user.last_name;
        console.log(fname)
        fname = user.first_name;
        email = user.email;
        nickname = user.nickname;
        fn_loc = document.querySelector('#studentName');
        fn_loc.innerText = nickname
        em_loc = document.querySelector('#studentEmail');
        em_loc.textContent = `${email}`
    
    });
    
}

getParams();
usersInfo();

//creating new messages
//UPDATE: work in progress
let postMsg = document.getElementById("postMsg");

postMsg.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("clicked")

    
})
//logout btn to prevent use to go back
const logoutBtn = document.querySelector("#logoutBtn")
logoutBtn.addEventListener('click', logout())

//Dropdown btns
let feelingsBtn = document.querySelector(".dropdown-menu")

feelingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log('clicked')
})

//main
params = getParams();
uid = params.uid;
usersInfo()

if (window.location.pathname === '/student') {
    getMess(uid);
    getAndRendMessages(uid)
}
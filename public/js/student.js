
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

    let updateJson = JSON.stringify(
        {
            nickname: newNickname,
        }
        )
    updateUser(updateJson, json_string => {
    console.log(json_string)
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
        // console.log(lname)
        fname = user.first_name;
        email = user.email;
        nickname = user.nickname;

        fn_loc = document.querySelector('#user_full_name');
        fn_loc.innerText = `${"Student: "} ${fname} ${lname}`

        nickn_loc = document.querySelector('#studentName');
        nickn_loc.innerText = nickname

        em_loc = document.querySelector('#studentEmail');
        em_loc.textContent = fname.charAt(0) + lname + "@WeAreHeroes.com"
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
    
    let feelingMsg = document.querySelector('#feelingMsg').value
    let studPostFeeling = document.querySelector('#studPostFeeling')

    studPostFeeling.innerText = "I am feeling " + feelingMsg + " today"
    console.log(feelingMsg)
    updateFeelings(feelingMsg)
    getFeeling(uid)
})


const updateFeelings = (studentFeels) => {
    fetch(`/api/feelings/${uid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            feeling: studentFeels
        }),
    })
        .then((res) => {
            console.log(res.json);
        })
        .catch((err) => console.error(err));
}

const getFeeling = () => {
    fetch(`/api/feelings/${uid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        return res.json();
    }).then((feelingInfo) => {
        console.log(feelingInfo)
        
        let currentFeeling = feelingInfo[feelingInfo.length - 1]
        console.log(currentFeeling)

        let latestUpdate = currentFeeling.createdAt
        console.log(latestUpdate)

        const updateFeelStatus = document.querySelector("#updateFeelStatus")
        updateFeelStatus.innerText =  latestUpdate.slice(5, 8) + latestUpdate.slice(8, 10) + "-" + latestUpdate.slice(0, 4)
    })
}


//Dropdown btn so student don't have to type out how they are feeling
let feelingsBtn = document.querySelector(".dropdown-menu")
feelingsBtn.addEventListener("click", printFeels)

function printFeels(e) {
    if (e.target !== e.currentTarget) {
        let clickedItem = e.target.id
        feelingMsg.innerText = clickedItem
    };
    e.stopPropagation();
}

//main
params = getParams();
uid = params.uid;
usersInfo()

if (window.location.pathname === '/student') {
    getMess(uid);
    getAndRendMessages(uid)
}

//FIXME:
//logout btn to prevent user to go backwards
const logoutBtn = document.querySelector("#logoutBtn")
logoutBtn.addEventListener('click', logout())













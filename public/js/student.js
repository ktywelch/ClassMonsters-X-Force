let newMessages, newMessageAlert, sendMessageBtn, newMessageCreateBtn;
let messCreateFrom, messChanged, params, uid;
let messIdLoc = document.querySelector('.message-id');
let messSubject = document.querySelector('.message-subject')
let messText = document.querySelector('.message-textarea');
let messFrom = document.querySelector('.message-from')
let messList = document.querySelectorAll('.list-container .list-group');
let messBtn = document.querySelector('#messBtn');
let messModal = document.querySelector("#messModal");
let lname,fname,role,full_name;
let activeMess = {};
let toId,myId,stuId,listItems;


let editNickname = document.querySelector("#editStudbtn")
let editParentBio = document.querySelector("#editParBio")
let fn_loc = document.querySelector('#user_full_name');
let nickn_loc = document.querySelector('#studentName');
let em_loc = document.querySelector('#studentEmail');
let studPostFeeling = document.querySelector('#studPostFeeling')
let updateFeelStatus = document.querySelector("#updateFeelStatus")
let parentContactBtn = document.querySelector("#parentContact")
let pFName = document.querySelector("#editFirst")
let pLName = document.querySelector("#parentLast")
let emailPar = document.querySelector("#EmailPar")
let numberPar = document.querySelector("#numberPar")
let postMsg = document.getElementById("postMsg");



//Clickable icon to open modal
let editPro = document.querySelector("#editPro");
editPro.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("character imaged clicked")
    $('#studModal').modal('show')
})


// Edit nickname
editNickname.addEventListener('click', (e) => {
    e.preventDefault();
    let newNickname = document.getElementById("btn_text").value
    console.log(newNickname)
    
    let updateJson = JSON.stringify({
            nickname: newNickname,
        })
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

//Update Parent Button
editParentBio.addEventListener('click', (e) => {
    e.preventDefault();

    let parentFi = document.querySelector("#parentFi").value
    let parentLa = document.querySelector("#parentLa").value
    let parentEm = document.querySelector("#parentEm").value
    let parentNum = document.querySelector("#parentNum").value 
                                        
    
    let updateJson = JSON.stringify({
            parentFName: parentFi,
            parentLName: parentLa,
            parentEmail: parentEm,
            parentPhoneNumber: parentNum
        })

    console.log(updateJson)
    updateUser(updateJson, json_string => {
    console.log(json_string)
    }).then((res) => {
        console.log(res.json)
    })
    .catch(err => {
        console.error(err);
    })
    location.reload()
})

//Parent Contact Modal
parentContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    $('#parentCon').modal('show')
})

const usersInfo = () => {
    getUserInfo(uid, user => {
        lname = user.last_name;
        fname = user.first_name;
        email = user.email;
        nickname = user.nickname;
        pFirst = user.parentFName;
        pLast = user.parentLName;
        pEmail = user.parentEmail;
        userChar = user.Character.filename;
        userAlt = user.Character.alt_text
        pNum = user.parentPhoneNumber
        console.log(pNum)
        

        pFName.innerText = pFirst
        pLName.innerText = pLast
        emailPar.innerText = pEmail
        numberPar.innerText =  + pNum
        
        userImg = document.querySelector("#studentImg");

        let newDiv = document.createElement("div");
        let newHtml = `<img  src="./images/${userChar}" alt="#{userAlt}">`
        newDiv.innerHTML = newHtml
        userImg.appendChild(newDiv)

        fn_loc.innerText = `${"Student: "} ${fname} ${lname}`

        //adding nickname
        nickn_loc.innerText = nickname

        //adding email
        em_loc.textContent = fname.charAt(0) + lname + "@WeAreHeroes.com"

        //setting current feelings
        currentFeels = user.Feelings.pop().feeling
        console.log(currentFeels)

        studPostFeeling.innerText = "I am feeling " + currentFeels + " today"

        //setting latest feelings update
        latestUpdate = user.Feelings.pop().createdAt

        updateFeelStatus.innerText =  latestUpdate.slice(5, 8) + latestUpdate.slice(8, 10) + "-" + latestUpdate.slice(0, 4)


    });
}

getParams();
usersInfo();

//creating new messages
postMsg.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("clicked")
    
    //students can type in the textarea to update feelings
    let feelingMsg = document.querySelector('#feelingMsg').value
    updateFeelings(feelingMsg)
    getFeeling(uid)
    location.reload()
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

const addNavList = () => {
    let navMess = document.querySelector('#navMess');
    navMess.addEventListener('click',() => {
    handleMessBtn("New Message",uid)
    showMessCenter();
    })
}

//main
params = getParams();
uid = params.uid;
usersInfo()

if (window.location.pathname === '/student') {
    addNavList()
    getMess(uid);
    getAndRendMessages(uid)
}

















let newMessages, newMessageAlert,sendMessageBtn, newMessageCreateBtn;
let messCreateFrom, messChanged,params;
let messIdLoc = document.querySelector('.message-id');
let messSubject = document.querySelector('.message-subject')
let messText = document.querySelector('.message-textarea');
let messFrom = document.querySelector('.message-from')
let messDrop = document.querySelector('.dropDownTo');
let messList = document.querySelectorAll('.list-container .list-group');
let messBtn = document.querySelector('#messBtn');
let messModal = document.querySelector("#messModal");
let lname,fname,role,full_name;
let activeMess = {};
let toId,myId,stuId,listItems,img_loc;


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

const renderStudents = (students,cb) => {
  let  allStuHtml= "";
  students.forEach(st => {   
    let nickname = st.nickname;
    if (st.nickname === null){
        nickname = st.first_name;
    }
    let newHtml =`
                <div class="col-md-4 mx-auto" style="display: inline;width: 60rem; ">
                  <div class="card mb-2 mx-auto" style="display: inline-table;">
                  <div class="text-center">
                  <img src="./images/${st.Character.filename}" alt="${st.Character.alt_txt}" 
                     class="img-responsive profile-image" id="stImg_${st.id}">
                  <h5 class="card-title">Student Information</h5>
                  <div class="text-left" >
                      <p>Name: ${st.first_name}  ${st.last_name}</p>
                      <p>Prefers: ${nickname} </p>
                      <p id="feeling_update_${st.id}"> </p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <div class="dropdown">
                          <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Class Tools</button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                  <button class="dropdown-item Send_Message" type="button" value="${st.id}">Send Message to Student</button>
                                  <button class="dropdown-item Delete_Student" type="button" value="${st.id}">Delete Student</button> 
                                  <button class="dropdown-item Change_Teacher" type="button" value="${st.id}">Change Teacher</button>    
                              </div>
                            </div>
                          </div> 
                          <div class="btn-group">
                            <div class="dropdown">
                             <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Admin Tools</button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item"> <a href="mailto:${st.parentEmail}">Send an e-mail to parent</a></button>
                          </div>
                        </div>
                       </div> 
                      </div> 
                        <small class="text-muted"></small>
                      </div>
                    </div>
                  </div>
                </div>
    `
  allStuHtml += newHtml; 
        
  });
  let locCount = document.querySelector('#stuCount');
  let stuInfo = document.querySelector('#stu-info')
  let newDiv1 = document.createElement("div");
  let newDiv = document.createElement("div");
  let headHtml = `<h4 class="m-t-0 m-b-20"> Student List (${students.length})</h4>`
  newDiv1.innerHTML = headHtml;
  locCount.appendChild(newDiv1)
  newDiv.innerHTML = allStuHtml;
  stuInfo.appendChild(newDiv);
  cb()
}
//adding listeners to the nav bar
const addMessBtnList = () => {
  btnMess = document.querySelector('#messBtn');
    btnMess.addEventListener('click',(e) => {
      handleMessBtn("New Message",uid)
      showMessCenter();
    })
  }
  
    const addNavList = () => {
      let navMess = document.querySelector('#navMess');
        navMess.addEventListener('click',(e) => {
          e.preventDefault();
          handleMessBtn("New Message",uid)
          showMessCenter();
        })
        

  let navReload = document.querySelector('#navReload');
    navReload.addEventListener('click',(e) => {
      e.preventDefault();
      getAndRenderSudents(uid);
      location.reload();
    })  

    let navReports = document.querySelector('#navReports');
    navReports.addEventListener('click',(e) => {
      e.preventDefault();
      //getAndRenderSudents(uid);
      //location.reload();
    }) 
    let navUpdate = document.querySelector('#navUpdate');
    navUpdate.addEventListener('click',(e) => {
      e.preventDefault();
      //getAndRenderSudents(uid);
      //location.reload();
    })   
  }

//post render ass the listeners for the student pages  
const addStuListeners = () => {  
    listItems = document.querySelectorAll('.list-container .list-group');
    //Listeners for all Student Send Messages
    document.querySelectorAll('.Send_Message').forEach( (btn) => { 
      console.log("added Lis");
      btn.addEventListener('click',() =>  {
          stuId = btn.value;
          handleMessBtn("New Stu Message",uid);
          showMessCenter();
      });
    })
}

//Gets the students that belong to the teacher
const getStudents = (t_id,cb) => {
  fetch(`/api/students/${t_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {return res.json()
  }).then((students) => {
    cb(students); 
  }).catch(err => console.error(err))
}    

//main
params = getParams();
uid = params.uid;
//getUserInfor is in common function
getUserInfo(uid, user =>  {
  if (user) {
  lname = user.last_name;
  fname = user.first_name;
  character = user.Character.filename;
  let teach_place = document.querySelector('#teacher_img')
  let newD2 = document.createElement("div");
  let newHtml = `<img src="./images/${user.Character.filename}" alt="${user.Character.alt_text}">`
  newD2.innerHTML=newHtml
  teach_place.appendChild(newD2); 
  fn_loc = document.querySelector('#user_full_name');
  fn_loc.innerText = `${fname} ${lname}`
  newD2="";
  }
});

const updStudentFeelings = (students) => {
  students.forEach(el =>{
    let stId =  el.id;
    getUserInfo(stId, user => {
     let nm = `#stImg_${stId}`
     let img_loc = document.querySelector(nm) 
     let date_loc = document.querySelector(`#feeling_update_${stId}`)
     let lastFeeling = (user.Feelings.length - 1)
     console.log(stId,lastFeeling)
     if(lastFeeling >= 0){
         let currentFeels = (user.Feelings[lastFeeling].feeling);
        let updTime = new Date((user.Feelings[lastFeeling].createdAt)).toLocaleString("en-US", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: "America/Los_Angeles"})
        date_loc.innerText = "Updated: " + updTime;
        switch (currentFeels) {
          case 'happy':
            img_loc.classList.add("bg-success")
            break;
          case 'angry':
        console.log("here")
          img_loc.classList.add("bg-danger")
            break;
          case "tired":
            img_loc.classList.add("bg-warning")
            break;
          case "confused":
            img_loc.classList.add("bg-info")
            break;
          case "sad":
            img_loc.classList.add("bg-secondary")
            break;
          default:
            break;
        }
    }
    })
  }) 
}

/*can't render students without getting them first, can't add the listeners without render ... 
using callbacks to ensure we get,render and update so putting all in one set.
*/
const getAndRenderSudents = (uid) => {
  getStudents(uid, students => renderStudents(students, () => {
    addStuListeners();
    updStudentFeelings(students);
  }))
}
 
if (window.location.pathname === '/teacher') {
    //these are from common & message js since they are common to students and teachers
    addNavList();
    addMessBtnList();
    getMess(uid);
    getAndRendMessages(uid);
    getAndRenderSudents(uid)
;

}
let newMessages, newMessageAlert,sendMessageBtn, newMessageCreateBtn;
let messCreateFrom, messChanged,params;
let messIdLoc = document.querySelector('.message-id');
let messSubject = document.querySelector('.message-subject')
let messText = document.querySelector('.message-textarea');
let messFrom = document.querySelector('.message-from')
let messList = document.querySelectorAll('.list-container .list-group');
let lname,fname,role,full_name;
let activeMess = {};
let stu_img,alt,stu_name; 


let begHtml =`<div class="row row-space-2" >
  </div><div class="col-md-6 m-b-2">\
    <divclass="p-10 bg-white">\
        <div class="media media-xs overflow-visible">\
            <a class="media-left" href="javascript:;">`;

// //let midHtml= `<img src=${stu_img} alt=${alt} class="media-object img-circle"></a>
//             <div class="media-body valign-middle">
//                 <b class="text-inverse">${full_name}</b>`;


// Teacher Functions

const renderStudents = (students) => {
  let  allStuHtml= "";
  students.forEach(st => {   
    let nickname = st.nickname;
    if (st.nickname === null){
        nickname = st.first_name;
    }
    let newHtml =`
                <div class="col-md-4 mx-auto" style="display: inline-block;width: 16rem;">
                  <div class="card mb-2 mx-auto" style="display: flex;">
                  <div class="text-center">
                  <img src="./images/${st.Character.filename}" alt="${st.Character.alt_txt}" 
                     class="img-responsive profile-image" 
                     />
                  <h5 class="card-title">Student Information</h5>
                  <div class="text-left" >
                      <p>Name: ${st.first_name}  ${st.last_name}</p>
                      <p>Prefers: ${nickname} </p>
                      <p>Bio: </p>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <div class="dropdown">
                          <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Class Tools</button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                  <button class="dropdown-item" type="button" id="Send_Message" value="${st.id}">Send Message to Student</button>
                                  <button class="dropdown-item" type="button" id="Send_Message" value="${st.id}">Send Message to Student</button>
                                  <button class="dropdown-item" type="button" id="Delete_Student" value="${st.id}">Deleter Student</button> 
                                  <button class="dropdown-item" type="button" id="Change_Teacher" value="${st.id}">Change Teacher</button>    
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
  // console.log (stuHtml)        
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
}




const getStudents = (t_id,cb) => {
  console.log("getting Students");
  fetch(`/api/students/${t_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {return res.json()
  }).then((students) => {
    //console.log(students)
    cb(students); 
  }).catch(err => console.error(err))
}    

//main
params = getParams();
uid = params.uid;
//getUserInfor is in common 
getUserInfo(uid, user =>  {
  console.log(user)
  if (user) {
  lname = user.last_name;
  fname = user.first_name;
  console.log(user.Character.filename)
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
 
if (window.location.pathname === '/teacher') {
    //these are from common & message js since they are common to students and teachers
    getMess(uid);
    getAndRendMessages(uid);
    getStudents(uid, students => renderStudents(students));
}
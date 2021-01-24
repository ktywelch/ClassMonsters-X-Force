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
  lname = user.last_name;
  fname = user.first_name;
  let teach_place = document.querySelector('#teacher_img')
  let newD = document.createElement("div");
  let newHtml = `<img src="./images/${user.Character.filename}" alt="${user.Character.alt_text}">`
  newD.innerHTML=newHtml
  teach_place.appendChild(newD); 
  fn_loc = document.querySelector('#user_full_name');
  fn_loc.innerText = `${fname} ${lname}`
  newD="";
});
 
if (window.location.pathname === '/teacher') {
    //these are from common & message js since they are common to students and teachers
    let allStuHtml = "";
    getMess(uid);
    getAndRendMessages(uid);
    getStudents(uid, students =>{
      let newD = document.createElement("div");
      let headHtml = `<h4 class="m-t-0 m-b-20"> Student List (${students.length})</h4>`
      students.forEach(st => {   
        let nickname = st.nickname;
        if (st.nickname === null){
            nickname = st.first_name;
        }
        let newHtml =`
                    <div class="col-md-4">
                      <div class="card mb-4 box-shadow">
                      <div class="float-md-left">
                      <img src="./images//${st.Character.filename}" alt="${st.Character.alt_txt}" 
                         class="p-3 img-responsive profile-image float-md-left float-sm-left w-25" 
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
                                      <button class="dropdown-item"> <a href="mailto:${st.parentEmail}">Send an e-mail to parent</a></button>
                                      <button class="dropdown-item" type="button" id="Change_Character" value="${st.id}">Change Character</button> 
                                      <button class="dropdown-item" type="button" id="Change_Teacher" value="${st.id}">Change Teacher</button>    
                                  </div>
                                </div>
                              </div> 

                              <button type="button" class="btn btn-sm btn-outline-secondary">Admin Tools</button>
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
      let stuInfo = document.querySelector('#stu-info')
      newD.innerHTML = headHtml + allStuHtml;
      stuInfo.appendChild(newD);
    })
}
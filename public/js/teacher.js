let newMessages, newMessageAlert,sendMessageBtn, newMessageCreateBtn;
let messCreateFrom, messChanged,params;
let messIdLoc = document.querySelector('.message-id');
let messSubject = document.querySelector('.message-subject')
let messText = document.querySelector('.message-textarea');
let messFrom = document.querySelector('.message-from')
let messList = document.querySelectorAll('.list-container .list-group');
let lname,fname,role,full_name;



//main
params = getParams();
uid = params.uid;
getUserInfo(uid, user => {
  lname = user.last_name;
  fname = user.first_name;
  fn_loc = document.querySelector('#user_full_name');
  fn_loc.innerText = `${fname} ${lname}`
});
 
if (window.location.pathname === '/teacher') {
    getMess(uid);
    getAndRendMessages(uid)
}
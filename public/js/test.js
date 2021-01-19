
let emoticon;
 
fetch('/api/icons', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})
.then(function(resp) {
  emotion = resp;
  console.log(emoticon);
  return emoticon;
})

let mainDoc = document.querySelector('#main');
  let newD = document.createElement("div");
     newD.setAttribute("id","generalInfo");
     newD.innerHTML=`<p>icons are here: ${emoticon}</p>`;
     mainDoc.appendChild(newD)



console.log("made it this far");
  
fetch('/api/user_data', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  }).then((data) => {
    //so using 
    if(data.url){
      window.location.href=data.url
      } else {
        console.log("need to add message here")
      }
    
  }).catch((err) => console.log(err))



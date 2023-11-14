const socket=io()
let username;
let currentDate = new Date();
while(!username)
{
  username=prompt("Enter you Username");
}
let textarea=document.querySelector('#text');
let messagearea=document.querySelector(".message-section");
textarea.addEventListener('keyup',(e)=>{
  if(e.key==="Enter")
  {
    sendmessage(e.target.value);
  }
})

function sendmessage(msgi)
{
  let currentDate = new Date();
  let minutes=currentDate.getMinutes();
  console.log(typeof(minutes));
  
  let time=currentDate.getHours()+":"+minutes;
  //console.log(time);
  let msg={
    user:username,
    message:msgi.trim(),
    clock: time
  }

  //Append

  appendmessage(msg,"out-message");
  scrolltobotttom();
  textarea.value="";
  //send to server
  socket.emit("message",msg)
}

function appendmessage(msg,type)
{
   let maindiv=document.createElement("div");
   let classname=type;
   maindiv.classList.add(classname ,"message");
   let markup=`
   <h4>${msg.user}</h4>
   <p>${msg.message}</p>
   <h6>${msg.clock}</h6>
   `

   maindiv.innerHTML=markup;
   messagearea.appendChild(maindiv);
}

socket.on("message",(msg)=>{
 
  appendmessage(msg,"in-message");
  scrolltobotttom();
})

function scrolltobotttom(){
  messagearea.scrollTop=messagearea.scrollHeight
}

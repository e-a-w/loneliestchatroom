// const { json } = require("body-parser");

// global variables
const button = document.querySelector("button");
const chatbox = document.getElementById("chatbox");
const textbox = document.querySelector("input");
const form = document.querySelector("form");
let mssgId = 0;

// generate me, myself or I randomly
const meMyselfI = () => {
  let senders = ["Me: ", "Myself: ", "I: "];
  let randomSender = Math.floor(Math.random() * senders.length);
  return senders[randomSender];
}

const timestamp = () => {
      let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
      time = time.slice(0,5);
      return time;
}

// create new message
const createMessage = (sender, text) => {
  let newMssg = document.createElement("div");
  newMssg.classList.add("message");
  newMssg.setAttribute("id", mssgId);
  newMssg.innerHTML = `
		  <span>${timestamp()}</span>
          <span class="sender">${sender}</span>
          <span>${text}</span>
          <span onclick="deleteMessage(${mssgId})" class="delete">❌</span>`
  chatbox.appendChild(newMssg);
  mssgId++;
  console.log(newMssg);
}

// handle form submit
const formSubmit = (event) => {
  event.preventDefault();
  createMessage(meMyselfI(), textbox.value);
  
  const options = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: textbox.value.toJSON
  }

  fetch('/messages', options)
    .then(response => console.log(response))
    .catch(error => console.error(error));

  textbox.value = "";
}

form.addEventListener('submit', formSubmit);

// fetch and make Chuck Norris joke message
const chuckNorris = () => {
  fetch('https://api.icndb.com/jokes/random')
    .then(res => res.json())
    .then(data => {
      let randomJoke = data.value.joke;
      createMessage(`<img class="chuck" src='https://cdn.hipwallpaper.com/i/74/41/pRjTyh.jpg'> Fact: `, randomJoke);
    }).catch(err => console.error(err));
}

button.addEventListener("click", chuckNorris);

//delete message

const deleteMessage = (id) => {
  let mssge = document.getElementById(id);
  console.log(id);
  console.log(mssge);
  mssge.remove();
}
// global variables
const button = document.querySelector("button");
const chatbox = document.getElementById("chatbox");
const textbox = document.querySelector("input");
const form = document.querySelector("form");
let senderIndex = 0;

// generate me, myself or I randomly
const meMyselfI = () => {
  let senders = ["Me: ", "Myself: ", "I: "];
  let randomIndex = Math.floor(Math.random() * senders.length);
  return senders[randomIndex];
}

const timestamp = () => {
      let time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
      time = time.slice(0,5);
      return time;
}

// create new message
const createMessage = (id, time, sender, text) => {
  let newMssg = document.createElement("div");
  newMssg.classList.add("message");
  newMssg.setAttribute("id", id);
  newMssg.innerHTML = `
		  <span>${time}</span>
          <span class="sender">${sender}</span>
          <span>${text}</span>
          <span onclick="deleteMessage(${id})" class="delete">❌</span>`
  chatbox.appendChild(newMssg);
}

// load any old messages

const loadMessages = () => {
  fetch('/messages')
    .then(res => res.json())
    .then(res => {
      res.forEach(mssg => {
        createMessage(mssg.id, mssg.timestamp, mssg.sender, mssg.message);
      })
  }).catch(err => console.error(err));
}

window.addEventListener('load', loadMessages);

// post data and create message based on response

const makePost = (sender, message) => {
  let thisTime = timestamp();
  let thisSender = sender;
  let thisMessage = message;
  let text = {
    "timestamp": `${thisTime}`,
    "sender": `${thisSender}`,
    "message": `${thisMessage}`
  };
  text = JSON.stringify(text);

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: text
  }
  
  fetch('/messages', options)
    .then(response => response.json())
    .then(res => {
      createMessage(res.id, res.timestamp, res.sender, res.message);
    })
    .catch(error => console.error(error));
}

// handle form submit, send and get data from server
const formSubmit = (event) => {
  event.preventDefault();
  makePost(meMyselfI(), textbox.value)
  textbox.value = "";
}

form.addEventListener('submit', formSubmit);

// fetch and make Chuck Norris joke message
const chuckNorris = () => {
  fetch('https://api.icndb.com/jokes/random')
    .then(res => res.json())
    .then(data => {
      makePost(`<img class="chuck" src='https://cdn.hipwallpaper.com/i/74/41/pRjTyh.jpg'> Fact: `, data.value.joke);
    }).catch(err => console.error(err));
}

button.addEventListener("click", chuckNorris);

// delete message

const deleteMessage = (id) => {
  let thisMessage = document.getElementById(id);
  thisMessage.remove();
  fetch(`messages/${id}`, {method: 'DELETE'})
  .then(res => res.json())
  .catch(err => console.error(err));
}
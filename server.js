const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

let messageArray = [];
let mssgID = 0;

app.get("/", (req, res) => {
    console.log( req.url );
    res.sendFile('index.html');
})

app.get("/messages", (req, res) =>{
    if (messageArray.length > 0 ) {
        res.send(messageArray);
    } else {
        res.send("NO MESSAGES HERE")
    }
})

app.get("/messages/:id", (req, res) => {
    const message = messageArray.find(m => m.id === parseInt(req.params.id));
    if (!message) {
        res.status(404).send('message not found.');
    } else {
        res.send(message);
    }
})

app.post("/messages", (req, res) =>{
    const newMessage = {
        "id": mssgID,
        "timestamp": req.body.timestamp,
        "sender": req.body.sender,
        "message": req.body.message
    }
    mssgID++;
    messageArray.push(newMessage);
    console.log(messageArray);
    res.send(newMessage);
})

app.delete("/messages/:id", (req, res, next) => {
    const messageID = Number(req.params.id);
    const messageToDelete = messageArray.find((mssg) => mssg.id === messageID);
    if (messageToDelete) {
      const indexOfItemToDelete = messageArray.indexOf(messageToDelete);
      messageArray.splice(indexOfItemToDelete, 1);
      res.json(messageToDelete);
    } else {
      res.status(404).json({ error: "message does not exist "});
    }
  });

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})
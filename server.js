const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());

let messageArray = [];

app.get("/", (req, res) => {
    console.log( req.url );
    res.sendFile('index.html');
})

app.get("/messages", (req, res) =>{
    res.send(messageArray);
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
        "id": messageArray.length,
        "message": req.body.messageName
    }
    messageArray.push(newMessage);
    console.log(messageArray);
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})
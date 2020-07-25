# loneliest chatroom

**Problems**:

When I have *"message": req.body.messageName* on line 33 of server.js AND in chucknorris.js, line 48: *body: {textbox.value}*, the code works on the server to post the value of the text input as the value of "message" in newMessage and saves it to the newMessage array.

However this causes everything to stop working in the actual chatbox, because the . in textbox.value causes a syntax error there.

I have tried saving textbox.value to a variable, using JSON.stringify, .toJSON, JSON.parse, putting textbox.value as the value of a key, using string interpolation, putting textbox.value in a variable and doing all the above to the variable, changing around the code in the server, and nothing works, because when I do any of that, I start getting 400 errors, or "message" (from line 33 of server.js) ends up with a value of undefined or an empty object {}

I can't get both the chatbox and the post request to work at the same time, just one or the other, because of those two lines of code.
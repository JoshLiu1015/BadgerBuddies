const express = require("express");
const { createNewMessage } = require("./controllers/messageControllers");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.json());

app.use("/user", require("./routes/userRoutes"));

// app.get("/", (req, res) => {
//     res.status(200).send("heeellllooooo");
// })

app.use("/preference", require("./routes/preferenceRoutes"));

app.use("/match", require("./routes/matchRoutes"));


app.use("/message", require("./routes/messageRoutes"));


/*
app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
})
*/

// Socket.IO
io.on('connection', (socket) => {
    // ...

    socket.on('sendMessage', async (data) => {
        const newMessage = new Message(data.senderId, data.receiverId, data.chatroomId, data.message);
        try {
            await newMessage.save();
            const receiverSocketId = onlineUsers.get(data.receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('newMessageNotification', {
                    from: data.senderId,
                    message: data.message
                });
            } else {
                sendPushNotification(data.receiverId, 'New message', data.message);
            }
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });
});


http.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});
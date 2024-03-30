const express = require("express");
const { createNewMessage } = require("./controllers/messageControllers");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const Message = require("./models/Message");

const receiversMap = new Map(); // This holds the mapping of userId to socketId

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
const onlineUsers = new Map(); // A map to hold the associations

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId; // Retrieve userId from the handshake query
    onlineUsers.set(userId, socket.id); // Associate userId with socket.id
    // console.log('User connected:', userId);

    socket.on('disconnect', () => {
        onlineUsers.delete(userId); // Remove the association when the user disconnects
        // console.log('User disconnected:', userId);
    });

    socket.on('sendMessage', async (data) => {
        const newMessage = new Message(data.senderId, data.receiverId, data.message);

        try {
            await newMessage.save();
            
            const receiverSocketId = onlineUsers.get(data.receiverId);
            
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receiveMessage', {
                    from: data.senderId,
                    message: data.message
                });
            } else {
                // The receiver is not connected to the socket server
                // sendPushNotification(data.receiverId, 'New message', data.message);
            }
            
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });
});


http.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});
const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageControllers");
const authControllers = require("../controllers/authControllers");


router
    .route("/")
    // registration
    .post(messageController.createNewMessage);


router
    .route("/id/:senderId/:receiverId")
    .get(authControllers.authenticateToken, messageController.getMessagesByUsersId)
    .delete(authControllers.authenticateToken, messageController.deleteMessages);




module.exports = router;
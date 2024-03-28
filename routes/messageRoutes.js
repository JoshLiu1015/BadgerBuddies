const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageControllers");


router
    .route("/")
    // registration
    .post(messageController.createNewMessage);


router
    .route("/id/:senderId/:receiverId")
    .get(messageController.MessageByUsersId)
    .delete(userControllers.deleteMessageByUsersId);




module.exports = router;
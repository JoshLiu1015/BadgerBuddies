const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");


router
    .route("/")
    .post(userControllers.createNewUser);

router
    .route("/id/:id")
    .get(userControllers.getUserById)
    .patch(userControllers.updateUser);

router
    .route("/email/:email")
    .get(userControllers.getUserByEmail);


module.exports = router;
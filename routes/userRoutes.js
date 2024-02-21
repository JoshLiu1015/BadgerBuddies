const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers");


router
    .route("/")
    // registration
    .post(userControllers.createNewUser);


/*
patch is used for partial updates. That is, 
it modifies only the specified fields of the resource 
at the URL, without requiring the entire resource
to be provided in the request.
*/
router
    .route("/id/:id")
    .get(authControllers.authenticateToken, userControllers.getUserById)
    // update user info
    .patch(authControllers.authenticateToken, userControllers.updateUser)
    .delete(userControllers.deleteUser);

router
    .route("/email/:email")
    .get(userControllers.getUserByEmail);


router
    .route("/login")
    .post((userControllers.loginUser))

router
    .route("/verify-email")
    .get(authControllers.verifyEmail)

module.exports = router;
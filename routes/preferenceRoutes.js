const express = require("express");
const router = express.Router();
const preferenceControllers = require("../controllers/preferenceControllers");
const authControllers = require("../controllers/authControllers");

router
    .route("/")
    .post(authControllers.authenticateToken, preferenceControllers.createPreference);

router
    .route("/id/:id")
    .get(authControllers.authenticateToken, preferenceControllers.getPreferenceById)
    .patch(authControllers.authenticateToken, preferenceControllers.updatePreference)
    .delete(authControllers.authenticateToken, preferenceControllers.deletePreference);


module.exports = router;
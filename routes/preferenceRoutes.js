const express = require("express");
const router = express.Router();
const preferenceControllers = require("../controllers/preferenceControllers");
const authControllers = require("../controllers/authControllers");

router
    .route("/")
    .post(authControllers.authenticateToken, preferenceControllers.createPreference);

router
    .route("/preferenceId/:id")
    .get(authControllers.authenticateToken, preferenceControllers.getPreferenceByPreferenceId)
    .patch(authControllers.authenticateToken, preferenceControllers.updatePreference)
    .delete(authControllers.authenticateToken, preferenceControllers.deletePreference);

    router
    .route("/userId/:id")
    .get(authControllers.authenticateToken, preferenceControllers.getPreferenceByUserId);
    
    
    module.exports = router;
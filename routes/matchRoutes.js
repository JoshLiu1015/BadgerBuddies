const express = require("express");
const router = express.Router();
const matchControllers = require("../controllers/matchControllers");
const authControllers = require("../controllers/authControllers");

router
    .route("/userId/:id")
    // authControllers.authenticateToken, 
    .post(authControllers.authenticateToken, matchControllers.createMatch);

router
    .route("/matchId/:id")
    .get(authControllers.authenticateToken, matchControllers.getMatchByMatchId)
    .patch(authControllers.authenticateToken, matchControllers.updateMatch)
    .delete(authControllers.authenticateToken, matchControllers.deleteMatch);

router
    .route("/requesterId/:id")
    .get(authControllers.authenticateToken, matchControllers.getMatchByRequesterId);

router
    .route("/targetId/:id")
    .get(authControllers.authenticateToken, matchControllers.getMatchByTargetId);


module.exports = router;
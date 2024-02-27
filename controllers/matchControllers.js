const Match = require("../models/Match");
const matchAlgorithm = require("../services/matchAlgorithm")

const createMatch = async (req, res, next) => {
    try {
        const requesterId = req.params.id;
        // call findMatches from algorithmControllers to get matches, use a for loop to create them
        targetPreferences = await matchAlgorithm.findMatches(requesterId);

        // get the request body
        // const { requesterId, targetId } = req.body;

        for (const preference of targetPreferences) {
            // Create a new Match instance based on the values in the request body
            const match = new Match(requesterId, preference.userId);
            // Save the new instance into database
            let [info, _] = await match.save();
            
            // return status
            res.status(201).json({message: "Matche created successfully", Info: info});
        }
        
        
    } catch(error) {
        next(error);
    }
}

const updateMatch = async (req, res, next) => {
    try {
        const matchId = req.params.id;
        const updateData = req.body;
        const [info, _] = await Match.update(matchId, updateData);

        res.status(200).json({Info: info});

    } catch(error) {
        next(error);
    }
}

const getMatchByMatchId = async (req, res, next) => {
    try{
        const matchId = req.params.id;
        // preference is an object in an array that is nested in another array
        const [[match], _] = await Match.findByMatchId(matchId);

        res.status(200).json({Match: match});
    } catch(error) {
        next(error);
    }
}



const getMatchByRequesterId = async (req, res, next) => {
    try{
        const requesterId = req.params.id;
        // preference is an object in an array that is nested in another array
        const [[match], _] = await Match.findByRequesterId(requesterId);

        res.status(200).json({Match: match});
    } catch(error) {
        next(error);
    }
}


const getMatchByTargetId = async (req, res, next) => {
    try{
        const targetId = req.params.id;
        // preference is an object in an array that is nested in another array
        const [[match], _] = await Match.findByTargetId(targetId);

        res.status(200).json({Match: match});
    } catch(error) {
        next(error);
    }
}


// return all the matches that have been confirmed
const getMatchesByIsMatch = async (req, res, next) => {
    try {
        const [[matches], _] = await Match.findByIsMatch();

        res.status(200).json({Matches: matches});

    } catch(error) {
        next(error);
    }
}

const deleteMatch = async (req, res, next) => {
    try {
        const matchId = req.params.id;

        const [info, _] = await Match.delete(matchId);

        // make sure a row has been deleted, return 404 otherwise
        if (info.affectedRows === 0) {
            return res.status(404).json({ message: "Match not found" });
        }

        return res.status(200).json({ Info: info });
    } catch(error) {
        next(error);
    }
    
}


module.exports = {
    createMatch,
    updateMatch,
    getMatchByMatchId,
    getMatchByRequesterId,
    getMatchByTargetId,
    getMatchesByIsMatch,
    deleteMatch
}
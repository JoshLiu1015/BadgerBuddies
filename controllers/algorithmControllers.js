const Preference = require("../models/Preference");

// this function should run when a user requests matches. It returns 20 matches, then the frontend puts the 20 matches
// into database by looping through them
const findMatches = async (req, res, next) => {
    try {
            const userId = req.params.id;
            
            // Fetch the user's preferences
            const [[userPreferences]] = await Preference.findByUserId(userId);



            // need a function from Match to get all the user IDs this user has matched
            // then pass it as an argument into findPotentialMatches function
            // Todo:



            // Fetch potential matches based on exercise
            const [[potentialMatches]] = await Preference.findPotentialMatches(userPreferences.exercise);


            // Score each potential match based on criteria
            const scoredMatches = potentialMatches.map(match => {
                let score = 0;

                // Example scoring logic
                if (match.time === userPreferences.time) score += 10;
                if (match.location === userPreferences.location) score += 8;
                if (match.userLevel === userPreferences.partnerLevel) score += 5;
                if (userPreferences.partnerGender === 'Any' || match.gender === userPreferences.partnerGender) score += 2;

                return { matchId: match.userId, score };
            });

            // Sort matches by score in descending order
            scoredMatches.sort((a, b) => b.score - a.score);

            // Return the top 20 matches
            res.status(200).json({Matches: scoredMatches.slice(0, 20)});

        } catch(error) {
            next(error);
        }
     
}
    
module.exports = {
    findMatches
}
const Preference = require("../models/Preference");

// this function should run when a user requests matches. It returns 20 matches, then the matchControllers puts the 20 matches
// into database by looping through them
const findMatches = async (userId) => {
    try {
            // const userId = req.params.id;
            
            console.log("requesterId: ", userId);
            // Fetch the user's preferences
            const [[userPreferences]] = await Preference.findByUserId(userId);



            // findPotentialMatches will join Preference with Match to get the potential matches


            console.log("userPreferences:", userPreferences);
            // Fetch potential matches based on exercise
            const [targetPreferences, _] = await Preference.findPotentialMatches(userId, userPreferences.exercise);
            console.log("targetPreferences: ", targetPreferences);


            // Score each potential match based on criteria
            const scoredTargetPreferences = targetPreferences.map(targetPreference => {
                let score = 0;

                // Example scoring logic
                if (targetPreference.exercise === userPreferences.exercise) score += 20;
                if (targetPreference.time === userPreferences.time) score += 10;
                if (targetPreference.location === userPreferences.location) score += 5;
                if (targetPreference.userLevel === userPreferences.partnerLevel) score += 10;
                if (targetPreference.gender === userPreferences.partnerGender) score += 5;
                if (userPreferences.partnerGender === 'any' || userPreferences.location === 'any' || userPreferences.partnerLevel === 'any') score += 2;

                return { targetId: targetPreference.userId, score: score };
                // console.log("targetId: ", targetPreference.userId);
                // console.log("score: ", score);
            });
            // console.log("scoredTargetPreferences: ", scoredTargetPreferences);
            // Sort matches by score in descending order
            scoredTargetPreferences.sort((a, b) => b.score - a.score);

            // Return the top 20 matches
            return scoredTargetPreferences.slice(0, 20);

        } catch(error) {
            throw error;
        }
     
}
    
module.exports = {
    findMatches
}
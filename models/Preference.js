const db = require("../config/db");

class Preference {
    constructor(userId, exercise, time, location, userLevel, partnerLevel, userGender, partnerGender, exerciseDetails) {
        this.userId = userId;
        this.exercise = exercise;
        this.time = time;
        this.location = location;
        this.userLevel = userLevel;
        this.partnerLevel = partnerLevel;
        // store user's gender again in a different table in database
        // otherwise we need to query the user table just to get
        // user's gender for the matching algorithm
        // but users doesn't need to choose their again
        // the frontend will record user's gender when they register
        this.userGender = userGender;
        this.partnerGender = partnerGender;
        this.exerciseDetails = exerciseDetails;

        this.isActive = 1;
    }


    save() {
        let sql = `
        INSERT INTO Preferences (
            userId,
            exercise,
            time,
            location,
            userLevel,
            partnerLevel,
            userGender,
            partnerGender,
            exerciseDetails,
            isActive
        )
        VALUE(
            '${this.userId}',
            '${this.exercise}',
            '${this.time}',
            '${this.location}',
            '${this.userLevel}',
            '${this.partnerLevel}',
            '${this.userGender}',
            '${this.partnerGender}',
            '${this.exerciseDetails}',
            '${this.isActive}'
        )`

        // return a promise
        return db.execute(sql);
    }

    static update(id, updateData) {
        // array used for the sql query
        let updates = [];

        // array used for the parameters for ? in the query
        let params = [];


        // Loop through each property in updateData
        for (let key in updateData) {
            let value = updateData[key];

            // Skip undefined or null values
            if (value !== undefined && value !== null) {
                updates.push(`${key} = ?`);
                params.push(value);
            }
        }

        // Append the user ID at the end of the parameters array for the WHERE clause
        params.push(id);

        // Construct the SQL statement
        let sql = `UPDATE Preferences SET ${updates.join(', ')} WHERE id = ?`;

        // Add lines to debug
        console.log("key: ", updates);
        console.log("params: ", params); 
        


        // Execute the SQL statement with parameters
        return db.execute(sql, params);
    }

    static findByPreferenceId(id) {
        let sql = `SELECT * FROM Preferences WHERE id = ?`;

        return db.execute(sql, [id]);
    }

    static findByUserId(id) {
        let sql = `SELECT * FROM Preferences WHERE userId = ?`;

        return db.execute(sql, [id]);
    }

    static delete(id) {
        let sql = `DELETE FROM Preferences WHERE id = ?`;

        return db.execute(sql, [id]);
    }


    // return all user preferences that matches the exercise
    static findPotentialMatches(userId, exercise) {
        // Construct the SQL query to join with the match table and filter based on match acceptance or declination

        /*
        The SELECT 1 is used in subqueries where the actual data selected isn't important. 
        It's a common pattern used in EXISTS and NOT EXISTS subqueries. 
        The database checks for the existence of rows that meet the subquery's conditions 
        rather than retrieving particular values from those rows. If the subquery finds 
        at least one row that meets the conditions, EXISTS returns true, and NOT EXISTS returns false.
        */

        let sql = `
        SELECT p.* 
        FROM Preferences p
        WHERE p.userId != ?
        AND NOT EXISTS (
            SELECT 1 
            FROM Matches m 
            WHERE m.targetId = p.userId 
            AND m.requesterId = ? 
            AND (m.isMatchAccepted = 1 OR m.isMatchDeclined = 1 OR m.isMatchCreated = 1)
        )`;

        /*
        Selects all preferences (p.*) that match a given exercise.
        Ensures that the userId of the preference is not the same as the userId passed to the function, to avoid self-matching.
        Uses a NOT EXISTS subquery to exclude preferences where there exists a match attempt by the userId (m.requesterId = ?) 
        that has been either accepted (m.isMatchAccepted = 1) or declined (m.isMatchDeclined = 1).
        */

        // Execute the query with the exercise parameter
        return db.execute(sql, [userId, userId]);
    }
}

module.exports = Preference;
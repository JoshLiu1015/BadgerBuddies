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

        this.isActive = 0;
    }


    save() {
        let sql = `
        INSERT INTO Preference(
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
        let sql = `UPDATE Preference SET ${updates.join(', ')} WHERE id = ?`;

        // Add lines to debug
        console.log("key: ", updates);
        console.log("params: ", params); 
        


        // Execute the SQL statement with parameters
        return db.execute(sql, params);
    }

    static findByPreferenceId(id) {
        let sql = `SELECT * FROM Preference WHERE id = ?`;

        return db.execute(sql, [id]);
    }

    static findByUserId(id) {
        let sql = `SELECT * FROM Preference WHERE id = ?`;

        return db.execute(sql, [id]);
    }

    static delete(id) {
        let sql = `DELETE FROM Preference WHERE id = ?`;

        return db.execute(sql, [id]);
    }


    // return all user preferences that matches the exercise
    static findPotentialMatches(exercise, userIdsMatched) {
        // Check if there are any userIds to exclude to prevent SQL syntax error with empty NOT IN ()
        if (userIdsMatched.length > 0) {
            // Create a string of placeholders for each userId to be excluded
            const placeholders = userIdsMatched.map(() => '?').join(',');
            // Construct the SQL query string with placeholders for dynamic parameters
            let sql = `SELECT * FROM Preference WHERE exercise = ? AND userId NOT IN (${placeholders})`;
            
            // The JavaScript spread operator (...) allows us to quickly copy all or part of an existing array or object into another array or object.
            return db.execute(sql, [exercise, ...userIdsMatched]);
        } else {
            // If there are no userIds to exclude, execute a simpler query
            let sql = `SELECT * FROM Preference WHERE exercise = ?`;
            return db.execute(sql, [exercise]);
        }
    }
}

module.exports = Preference;
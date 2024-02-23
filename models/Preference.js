const db = require("../config/db");

class Preference {
    constructor(userId, sport, time, location, userLevel, partnerLevel, partnerGender) {
        this.userId = userId;
        this.sport = sport;
        this.time = time;
        this.location = location;
        this.userLevel = userLevel;
        this.partnerLevel = partnerLevel;
        this.partnerGender = partnerGender;
        this.sportDetails = sportDetails;
    }


    save() {
        let sql = `
        INSERT INTO Preference(
            userId,
            sport,
            time,
            location,
            userLevel,
            partnerLevel,
            partnerGender,
            sportDetails
        )
        VALUE(
            '${this.userId}',
            '${this.sport}',
            '${this.time}',
            '${this.location}',
            '${this.userLevel}',
            '${this.partnerLevel}',
            '${this.partnerGender}',
            '${this.sportDetails}'
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

    static findById(id) {
        let sql = `SELECT * FROM Preference WHERE id = ?`;

        return db.execute(sql, [id]);
    }

    static delete(id) {
        let sql = `DELETE FROM Preference WHERE id = ?`;

        return db.execute(sql, [id]);
    }
}

module.exports = Preference;
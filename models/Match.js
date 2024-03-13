const db = require("../config/db");


class Match {
    constructor(requesterId, targetId) {
        this.requesterId = requesterId;
        this.targetId = targetId;
        this.isMatchAccepted = 0;
        this.isMatchDeclined = 0;

        // isMatchCreated will be set to 0 after a period of time
        this.isMatchCreated = 1;
    }


    save() {

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        
        let createTime = `${year}-${month}-${day}`;


        let sql = `
        INSERT INTO Matches (
            requesterId, 
            targetId, 
            isMatchAccepted, 
            isMatchDeclined,
            isMatchCreated,
            createTime
        )
        VALUE(
            '${this.requesterId}',
            '${this.targetId}',
            '${this.isMatchAccepted}',
            '${this.isMatchDeclined}',
            '${this.isMatchCreated}',
            '${createTime}'
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
        let sql = `UPDATE Matches SET ${updates.join(', ')} WHERE id = ?`;

        // Add lines to debug
        console.log("key: ", updates);
        console.log("params: ", params); 
        


        // Execute the SQL statement with parameters
        return db.execute(sql, params);
    }

    static findByMatchId(id) {
        let sql = `SELECT * FROM Matches WHERE id = ?`;

        return db.execute(sql, [id]);
    }

    static findByRequesterId(id) {
        let sql = `SELECT m.id AS matchId, u.id AS userId, m.*, u.*
            FROM Matches m, Users u
            WHERE m.targetId = u.id
            AND m.requesterId = ?
            AND NOT (m.isMatchAccepted = 1
                OR m.isMatchDeclined = 1)`;

        return db.execute(sql, [id]);
    }

    static findByTargetId(id) {
        let sql = `SELECT * FROM Matches WHERE targetId = ?`;

        return db.execute(sql, [id]);
    }

    // static findByIsMatch() {
    //     let sql = `SELECT * FROM Match WHERE isMatchAccepted == 1 OR isMatchDeclined == 1`;

    //     return db.execute(sql);
    // }

    static delete(id) {
        let sql = `DELETE FROM Matches WHERE id = ?`;

        return db.execute(sql, [id]);
    }
}

module.exports = Match;
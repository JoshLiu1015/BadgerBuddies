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
        let sql = `
        INSERT INTO Matches (
            requesterId, 
            targetId, 
            isMatchAccepted, 
            isMatchDeclined,
            isMatchCreated
        )
        VALUES (?, ?, ?, ?, ?)
        `;

        return db.execute(sql, [
            this.requesterId,
            this.targetId,
            this.isMatchAccepted,
            this.isMatchDeclined,
            this.isMatchCreated
        ]);
    }

    // save() {

    //     let date = new Date();
    //     let year = date.getFullYear();
    //     let month = date.getMonth()+1;
    //     let day = date.getDate();
    //     let hours = date.getHours().toString().padStart(2, '0');
    //     let minutes = date.getMinutes().toString().padStart(2, '0');
    //     let seconds = date.getSeconds().toString().padStart(2, '0');

    //     let createTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
    //     // let createTime = `${year}-${month}-${day}`;


    //     let sql = `
    //     INSERT INTO Matches (
    //         requesterId, 
    //         targetId, 
    //         isMatchAccepted, 
    //         isMatchDeclined,
    //         isMatchCreated,
    //         createTime
    //     )
    //     VALUE(
    //         '${this.requesterId}',
    //         '${this.targetId}',
    //         '${this.isMatchAccepted}',
    //         '${this.isMatchDeclined}',
    //         '${this.isMatchCreated}',
    //         '${createTime}'
    //     )`

    //     // return a promise
    //     return db.execute(sql);
    // }


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

    static findMatchedUserAndLastMessageByRequesterId(id) {
        /*
        let sql = `SELECT ma.id AS matchId, u.id AS userId, me.id AS messageId, ma.*, u.*, me.*
            FROM Matches ma, Users u, Messages me
            WHERE ma.targetId = u.id
            AND ma.requesterId = ?
            AND NOT (ma.isMatchAccepted = 1
                OR ma.isMatchDeclined = 1)
            AND me.senderId = ma.requesterId
            AND me.receiverId = ma.targetId
            ORDER BY me.createTime DESC
            LIMIT 1`;
        */

        let sql = `SELECT ma.id AS matchId, u.id AS userId, me.id AS messageId, ma.*, u.*, me.*
        FROM Matches ma
        JOIN Users u ON ma.targetId = u.id
        LEFT JOIN (
            SELECT senderId, receiverId, MAX(createTime) AS latestMessageTime
            FROM Messages
            GROUP BY senderId, receiverId
        ) latestMessages ON latestMessages.senderId = ma.requesterId AND latestMessages.receiverId = ma.targetId
        LEFT JOIN Messages me ON me.senderId = latestMessages.senderId AND me.receiverId = latestMessages.receiverId AND me.createTime = latestMessages.latestMessageTime
        WHERE ma.requesterId = ?
        AND ma.isMatchAccepted = 1`;

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
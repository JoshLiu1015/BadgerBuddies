const db = require("../config/db");


class Message {
    constructor(senderId, receiverId, message) {{

        


        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;


    }}

    
    save() {

        let sql = `
        INSERT INTO messages (senderId, receiverId, message)
        VALUES (?, ?, ?)
        `;
        return db.execute(sql, [this.senderId, this.receiverId, this.message]);

    }

    



    static findByUserIds(senderId, receiverId) {
        let sql = `SELECT * FROM Messages WHERE senderId = ? AND receiverId = ?`;

        return db.execute(sql, [senderId, receiverId]);
    }

    

    static delete(senderId, receiverId) {
        let sql = `DELETE FROM Messages WHERE senderId = ? AND receiverId = ?`;

        return db.execute(sql, [senderId, receiverId]);
    }
}

module.exports = Message;

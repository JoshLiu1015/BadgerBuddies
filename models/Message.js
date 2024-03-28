const db = require("../config/db");


class Message {
    constructor(senderId, receiverId, chatroomId, message) {{

        


        this.senderId = senderId;
        this.receiverId = receiverId;
        this.chatroomId = chatroomId;
        this.message = message;


    }}

    
    save() {

        let sql = `
        INSERT INTO messages (sender_id, receiver_id, chat_room_id, message_text)
        VALUES (?, ?, ?, ?)
        `;
        return db.execute(sql, [this.senderId, this.receiverId, this.chatroomId, this.message]);

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

module.exports = User;

const Message = require("../models/Message");

const createNewMessage = async (req, res, next) => {
    try {
        const {senderId, receiverrId, message} = req.body;
        
        const newMessage = new Message(senderId, receiverrId, message);

        // Save the new instance into database
        let [info, _] = await newMessage.save();
        
        // return status
        res.status(200).json({Info: info});
        
    } catch(error) {
        next(error);
    }
}



const getMessagesByUsersId = async (req, res, next) => {
    try{
        const senderId = req.params.senderId;
        const receiverId = req.params.receiverId;

        
        const [[messages], _] = await Message.findByUserIds(senderId, receiverId);

        res.status(200).json({Messages: messages});
    } catch(error) {
        next(error);
    }
}




const deleteMessages = async (req, res, next) => {
    try {
        const senderId = req.params.senderId;
        const receiverId = req.params.receiverId;

        const [info, _] = await Match.delete(senderId, receiverId);

        // make sure a rows has been deleted, return 404 otherwise
        if (info.affectedRows === 0) {
            return res.status(404).json({ message: "Messages not found" });
        }

        return res.status(200).json({ Info: info });
    } catch(error) {
        next(error);
    }
    
}


module.exports = {
    createNewMessage,
    getMessagesByUsersId,
    deleteMessages
}
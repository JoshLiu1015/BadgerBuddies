const User = require("../models/User");

const createNewUser = async (req, res, next) => {
    try {
        let {email, password, firstName, lastName,
            gender, major, grade, weight, height,
            picture, isDeleted} = req.body;
        
        let user = new User(email, password, firstName,
            lastName, gender, major, grade, weight, height,
            picture, isDeleted,)

        user = await user.save();
        
        res.status(201).json({User: user});

        
    } catch(error) {
        next(error);
    }
}

module.exports = {createNewUser};
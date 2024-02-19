const User = require("../models/User");

const createNewUser = async (req, res, next) => {
    try {
        let {email, password, firstName, lastName,
            gender, major, grade, weight, height,
            picture, isDeleted} = req.body;
        
        let user = new User(email, password, firstName,
            lastName, gender, major, grade, weight, height,
            picture, isDeleted,)

        info = await user.save();
        
        res.status(201).json({Info: info});

        
    } catch(error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        let userId = req.params.id;
        let updateData = req.body;
        let [user, _] = await User.update(userId, updateData);

        res.status(200).json({User: user});
    } catch(error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try{
        let userId = req.params.id;
        let [user, _] = await User.findById(userId);

        res.status(200).json({User: user});
    } catch(error) {
        next(error);
    }
}

const getUserByEmail = async (req, res, next) => {
    try {
        let userEmail = req.params.email;
        let [user, _] = await User.findByEmail(userEmail);

        res.status(200).json({User: user});
    } catch(error) {
        next(error);
    }
}

module.exports = {
    createNewUser,
    updateUser,
    getUserById,
    getUserByEmail};
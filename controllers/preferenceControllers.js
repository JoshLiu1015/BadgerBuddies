const Preference = require("../models/Preference");

const createPreference = async (req, res, next) => {
    try {
        // get the request body
        const { userId, sport, time, location, userLevel, partnerLevel, partnerGender } = req.body;
        // create a new Preference instance based on the values in the request body
        const preference = new Preference(userId, sport, time, location, userLevel, partnerLevel, partnerGender);
        // save the new instance into database
        let [info, _] = await preference.save();
        // return status
        res.status(201).json({Info: info});
    } catch(error) {
        next(error);
    }
}

const updatePreference = async (req, res, next) => {
    try {
        const preferenceId = req.params.id;
        const updateData = req.body;
        const [info, _] = await Preference.update(preferenceId, updateData);

        res.status(200).json({Info: info});

    } catch(error) {
        next(error);
    }
}

const getPreferenceById = async (req, res, next) => {
    try{
        const preferenceId = req.params.id;
        // preference is an object in an array that is nested in another array
        const [[preference], _] = await Preference.findById(preferenceId);

        res.status(200).json({Preference: preference});
    } catch(error) {
        next(error);
    }
}



const deletePreference = async (req, res, next) => {
    try {
        const preferenceId = req.params.id;

        const [info, _] = await Preference.delete(preferenceId);

        // make sure a row has been deleted, return 404 otherwise
        if (info.affectedRows === 0) {
            return res.status(404).json({ message: "Preference not found" });
        }

        return res.status(200).json({ Info: info });
    } catch(error) {
        next(error);
    }
    
}


module.exports = {
    createPreference,
    updatePreference,
    getPreferenceById,
    deletePreference
}
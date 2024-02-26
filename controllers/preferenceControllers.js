const Preference = require("../models/Preference");

const createPreference = async (req, res, next) => {
    try {
        // get the request body
        const { userId, exercise, time, location, userLevel, partnerLevel, userGender, partnerGender, exerciseDetails } = req.body;
        // create a new Preference instance based on the values in the request body
        const preference = new Preference(userId, exercise, time, location, userLevel, partnerLevel, userGender, partnerGender, exerciseDetails);
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

const getPreferenceByPreferenceId = async (req, res, next) => {
    try{
        const preferenceId = req.params.id;
        // preference is an object in an array that is nested in another array
        const [[preference], _] = await Preference.findByPreferenceId(preferenceId);

        res.status(200).json({Preference: preference});
    } catch(error) {
        next(error);
    }
}

const getPreferenceByUserId = async (req, res, next) => {
    try{
        const userId = req.params.id;
        // preference is an object in an array that is nested in another array
        const [[preference], _] = await Preference.findByUserId(userId);

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
    getPreferenceByPreferenceId,
    getPreferenceByUserId,
    deletePreference
}
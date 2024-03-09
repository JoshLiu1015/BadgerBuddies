const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require("./authControllers");



const createNewUser = async (req, res, next) => {
    try {
        const {email, password, firstName, lastName,
            gender, major, grade, weight, height,
            picture} = req.body;
        
        const user = new User(email, password, firstName,
            lastName, gender, major, grade, weight, height,
            picture)
        console.log("userControlllers password: ", password);

        await user.setPassword(password);
        
        
        // check whether the email has been used and return 409
        const [[checkEmail]] = await User.findByEmail(email)
        
        if (checkEmail) {
            return res.status(409).send("The email has already been used");
        }


        // wait for the user to verify email before sending back status
        // this function is important to get called before user.save()
        // otherwise if the email address wasn't valid, the user would still
        // be stored into the database, but will never gets a verification token
        await sendVerificationEmail(user.email, user.emailVerificationToken);

        // TODO: handel when email isn't valid, should return something to the frontend
        
        let [info, _] = await user.save();
        

        



        res.status(200).json({Info: info});

    
    } catch(error) {
        /*
        next is a function that, when called, passes control to the next middleware
        in the stack. If next is called without arguments, Express will proceed 
        to the next middleware function that matches the route (if any) or end 
        the request-response cycle if there are no more matching middlewares.
        */

        /*
        When next is called with an argument, Express interprets this as an error, 
        and it bypasses any remaining non-error-handling middleware, passing control 
        directly to error-handling middleware. Error-handling middleware is defined 
        just like regular middleware but takes an extra parameter for the error object at the beginning.
        */

        // TODO: create a custom error-handling middleware instead of using a built-in one
        next(error);
    }
}


// const loginHelper = async (email) => {
//     try {
//         // user is an object in an array that is nested in another array
//         const [[user], _] = await User.findByEmail(email);

//         // if the user is found
//         if (user && user.isEmailVerified) {

//             // define a payload
//             const payload = { id: user.id, email: user.email };
//             // generate JWT (Json Web Token), which will be send back to the client
//             // When a new request comes in after the client has logged in,
//             // the token given to the client will be verified to check 
//             // authorization header of incoming requests 
//             const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});

//             return token;
            
//         }
//         else if (!user) {
//             // if the user isn't found
//             throw new Error("user not found")
//         }
//         else if (!user.isEmailVerified) {
//             throw new Error("email not verified");
//         }

//     } catch(error) {
//         throw error;
//     }
// }


const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const [info, _] = await User.update(userId, updateData);
        
        if (info.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({Info: info});
    } catch(error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try{
        const userId = req.params.id;
        // user is an object in an array that is nested in another array
        const [[user], _] = await User.findById(userId);

        res.status(200).json({User: user});
    } catch(error) {
        next(error);
    }
}

const getUserByEmail = async (req, res, next) => {
    try {
        const userEmail = req.params.email;
        const [[user], _] = await User.findByEmail(userEmail);

        res.status(200).json({User: user});
    } catch(error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const [info, _] = await User.delete(userId);

        if (info.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ Info: info });
    } catch(error) {
        next(error);
    }
    
}


const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // user is an object in an array that is nested in another array
        const [[user], _] = await User.findByEmail(email);

        // if the user is found
        if (user && user.isEmailVerified) {
            // compare the password user sent with the one stored in database
            const isMatch = await bcrypt.compare(password, user.password);
            // if it matches
            if (isMatch) {
                // define a payload
                const payload = { id: user.id, email: user.email };
                // generate JWT (Json Web Token), which will be send back to the client
                // When a new request comes in after the client has logged in,
                // the token given to the client will be verified to check 
                // authorization header of incoming requests 
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});

                return res.status(200).json({ User: user, Token: token })
            }
            // if not matches
            return res.status(401).send("Incorrect password");
        }
        else if (!user) {
            // if the user isn't found
            return res.status(404).send("User not found");
        }
        else if (!user.isEmailVerified) {
            return res.status(403).send("Email not verified");
        }

    } catch(error) {
        next(error);
    }
}








module.exports = {
    createNewUser,
    updateUser,
    getUserById,
    getUserByEmail,
    deleteUser,
    loginUser
};
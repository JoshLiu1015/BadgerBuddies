const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// a function called in createNewUser() it should be an async function because 
// it should return a promise for the awiat in createNewUser() to be effective.
// even tho sendVerificationEmail doesn't explicitly return a promise, 
// it still return a Promise<undefined> due to the async keyword
const sendVerificationEmail = async (userEmail, verificationToken) => {
    let transporter = nodemailer.createTransport({
        // Configure transport options
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let verifyUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Verify your email",
        html: 'Please click this link to verify your email address: <a href="http://localhost:3000/verify-email?token=${verificationToken}">Verify Email</a>'
    };

    await transporter.sendMail(mailOptions);
}


const createNewUser = async (req, res, next) => {
    try {
        let {email, password, firstName, lastName,
            gender, major, grade, weight, height,
            picture} = req.body;
        
        let user = new User(email, password, firstName,
            lastName, gender, major, grade, weight, height,
            picture)

        let [info, _] = await user.save();
        
        // wait for the user to verify email before sending back status
        await sendVerificationEmail(user.email, user.verificationToken);
        
        res.status(201).json({Info: info});

    
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

const updateUser = async (req, res, next) => {
    try {
        let userId = req.params.id;
        let updateData = req.body;
        let [info, _] = await User.update(userId, updateData);

        res.status(200).json({Info: info});
    } catch(error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try{
        let userId = req.params.id;
        // user is an object in an array that is nested in another array
        let [[user], _] = await User.findById(userId);

        res.status(200).json({User: user});
    } catch(error) {
        next(error);
    }
}

const getUserByEmail = async (req, res, next) => {
    try {
        let userEmail = req.params.email;
        let [[user], _] = await User.findByEmail(userEmail);

        res.status(200).json({User: user});
    } catch(error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let userId = req.params.id;

        let [info, _] = await User.delete(userId);

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
        console.log("email: ", email, password);
        // user is an object in an array that is nested in another array
        let [[user], _] = await User.findByEmail(email);

        // if the user is found
        if (user) {
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

                return res.status(200).json({ message: "Login successful", token })
            }
            // if not matches
            return res.status(401).send("Incorrect password");
        }
        // if the user isn't found
        return res.status(404).send("User not found");

    } catch(error) {
        next(error);
    }
}



// the function is used to 
const authenticateToken = (req, res, next) => {
    // the header is Authorization: Bearer token,
    // so split(" ") gets ["Bearer", "token"]

    /*
    the use of ?: If req.headers.authorization is undefined 
    (meaning the Authorization header is not present), 
    the optional chaining operator short-circuits 
    the operation, resulting in undefined 
    instead of throwing an error.
    */
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        // If no token is found, return an Unauthorized status
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            // If the token is invalid or expired, return a Forbidden status
            return res.sendStatus(403);

        }
        /*
        // After extracting the payload from the JWT,
        // It allows subsequent middleware and route handlers 
        // to access the authenticated user's information without 
        // needing to re-verify the token or re-fetch the user's details from the database.
        req.user = payload;
        */

        // Proceed to the next middleware or route handler
        next();
    })
}


module.exports = {
    createNewUser,
    updateUser,
    getUserById,
    getUserByEmail,
    deleteUser,
    loginUser,
    authenticateToken};
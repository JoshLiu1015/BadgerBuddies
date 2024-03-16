const User = require("../models/User");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");



// a function called in createNewUser() it should be an async function because 
// it should return a promise for the awiat in createNewUser() to be effective.
// even tho sendVerificationEmail doesn't explicitly return a promise, 
// it still return a Promise<undefined> due to the async keyword
const sendVerificationEmail = async (userEmail, emailVerificationToken) => {
    // console.log("emailVerificationToken: ", emailVerificationToken);

    
    let transporter = nodemailer.createTransport({
        // Configure transport options
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Verify your email",
        html: `Please click this link to verify your email address: <a href="http://192.168.1.168:3000/user/verify-email?token=${emailVerificationToken}&email=${userEmail}">Verify Email</a>`


    };

    await transporter.sendMail(mailOptions);
}




const verifyEmail = async (req, res, next) => {
    try {
        // get the token and email from the request url
        const { token, email } = req.query;

        // find the user based on the email
        const [[user], _] = await User.findByEmail(email);

        // console.log("user: ", user);
        
        // if the user isn't found based on the email
        if (!user) {
            res.status(400).send("Can't find the user. Please make sure it is the same email address as you registered!");
        }

        // user.isEmailVerified = true;
        /*
        Setting emailVerificationToken to undefined
        After the user has successfully verified their email, the emailVerificationToken has served its purpose. 
        Changing its value to undefined (or removing it) is a security measure

        Data Cleanliness: It helps in keeping your database clean from unnecessary data. 
        Once the token is used, storing it is no longer necessary.
        */
        // user.emailVerificationToken = "";

        updateData = {
            "isEmailVerified": true,
            "emailVerificationToken": null
        }
        // update the info
        await User.update(user.id, updateData);

        // without specifying a status code, Express defaults to sending a 200 OK status
        res.send("Email verified successfully");
    } catch(error) {
        next(error);
    }
    

}





// used to verify JWT given to users
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
    sendVerificationEmail,
    verifyEmail,
    authenticateToken
}
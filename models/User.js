const db = require("../config/db");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
    constructor(email, password, firstName, lastName, gender, major, year, weight, height, pictures, aboutMe) {{

        // console.log("User password: ", password);


        this.email = email;

        // Do not store the password directly.
        // passwordHash will be set after hashing
        this.passwordHash = ""

        // this.setPassword(password);


        // console.log("User passwordHash: ", this.passwordHash);

        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.major = major;
        this.year = year;
        this.weight = weight;
        this.height = height;


        this.pictures = pictures;
        this.aboutMe = aboutMe;

        // 0 means false, 1 means true
        this.isEmailVerified = 0;
        this.emailVerificationToken = this.generateVerificationToken();


    }}

    // this function is called in userControllers
    async setPassword(password) {
        this.passwordHash = await bcrypt.hash(password, saltRounds);
    }

    // generate a token that will be sent via an email to a user
    generateVerificationToken() {
        const { randomBytes } = require("crypto");
        return randomBytes(20).toString("hex");
    }
    
    save() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        
        let createTime = `${year}-${month}-${day}`;

        let sql = `
        INSERT INTO Users(
            email,
            password,
            firstName,
            lastName,
            gender,
            major,
            year,
            weight,
            height,
            pictures,
            aboutMe,
            isEmailVerified,
            emailVerificationToken,
            createTime
        )
        VALUES(
            '${this.email}',
            '${this.passwordHash}',
            '${this.firstName}',
            '${this.lastName}',
            '${this.gender}',
            '${this.major ? `'${this.major}'` : 'NULL'}',
            '${this.year}',
            ${this.weight ? `'${this.weight}'` : 'NULL'}, 
            ${this.height ? `'${this.height}'` : 'NULL'},
            ${this.pictures ? `'${this.pictures}'` : 'NULL'},
            ${this.aboutMe ? `'${this.aboutMe}'` : 'NULL'},
            '${this.isEmailVerified}',
            '${this.emailVerificationToken}',
            '${createTime}'
        )
        `;
        
        // return a promise
        return db.execute(sql);

    }

    static async update(id, updateData) {
        // array used for the sql query
        let updates = [];

        // array used for the parameters for ? in the query
        let params = [];


        // Loop through each property in updateData
        for (let key in updateData) {
            let value = updateData[key];

            // Special handling for password to hash it
            if (key === "password" && value) {
                // the execution in this async function is paused at each await
                value = await bcrypt.hash(value, saltRounds);
            }
            
            // only emailVerificationToken can be updated from some value to null
            if (key === "emailVerificationToken") {
                updates.push(`${key} = ?`);
                params.push(value);
            }

            // Skip undefined or null values
            if (value !== undefined && value !== null) {
                updates.push(`${key} = ?`);
                params.push(value);
            }
        }

        // Append the user ID at the end of the parameters array for the WHERE clause
        params.push(id);

        // Construct the SQL statement
        let sql = `UPDATE Users SET ${updates.join(', ')} WHERE id = ?`;

        // Add lines to debug
        console.log("key: ", updates);
        console.log("params: ", params); 
        


        // Execute the SQL statement with parameters
        return db.execute(sql, params);
        
    }



    static findById(id) {
        let sql = `SELECT * FROM Users WHERE id = ?`;

        return db.execute(sql, [id]);
    }

    static findByEmail(email) {
        let sql = `SELECT * FROM Users WHERE email = ?`;
        /*
        let sql = `SELECT * FROM Users WHERE email = ${email}`;
        If an attacker were to provide an email input like
        anything' OR '1'='1, the resulting SQL query could become
        something malicious, potentially returning all users or
         performing unintended actions.

        To mitigate SQL injection risks, you should use parameterized
        queries (also known as prepared statements).
        Parameterized queries ensure that user input is treated as data,
        not as part of the SQL command. With mysql2, you can use
        placeholders (?) in your SQL statement and provide the input values
        as an array. The library then safely incorporates the user input 
        into the SQL command, preventing injection attacks. 
        */
        return db.execute(sql, [email]);
    }

    static delete(id) {
        let sql = `DELETE FROM Users WHERE id = ?`;

        return db.execute(sql, [id]);
    }
}

module.exports = User;

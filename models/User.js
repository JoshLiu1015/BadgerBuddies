const db = require("../config/db");
const bcrypt = require('bcrypt');
const { param } = require("../routes/userRoutes");
const saltRounds = 10;

class User {
    constructor(email, password, firstName, lastName, gender, major, grade, weight, height, picture, isDeleted) {{
        this.email = email;

        // Do not store the password directly.
        // passwordHash will be set after hashing
        this.passwordHash = ""

        this.setPassword(password);

        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.major = major;
        this.grade = grade;
        this.weight = weight;
        this.height = height;

        /*
        Store Images as Files and Save the Path in the Database
        Storing the actual image files in a file system 
        (either on the server or through a cloud storage service)
        and then saving the path or URL to the image in your user model/database.
        */
        this.picture = picture;

        this.isDeleted = isDeleted;


    }}

    async setPassword(password) {
        this.passwordHash = await bcrypt.hash(password, saltRounds);
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
            grade,
            weight,
            height,
            picture,
            isDeleted,
            createTime
        )
        VALUES(
            '${this.email}',
            '${this.passwordHash}',
            '${this.firstName}',
            '${this.lastName}',
            '${this.gender}',
            '${this.major}',
            '${this.grade}',
            '${this.weight}',
            '${this.height}',
            '${this.picture}',
            '${this.isDeleted}',
            '${createTime}'
        )
        `;
        
        // return a promise
        return db.execute(sql);

    }

    static async update(id, updateData) {
        const { email, password, firstName, lastName, gender, major, grade, weight, height, picture, isDeleted } = updateData;
        
        // let updateDataArray = updateData.keys();


        // array used for the sql query
        let updates = [];

        // array used for the parameters for ? in the query
        let params = [];


        // Loop through each property in updateData
        for (let key in updateData) {
            let value = updateData[key];

            // Special handling for password to hash it
            if (key === 'password' && value) {
                // the execution in this async function is paused at each await
                value = await bcrypt.hash(value, saltRounds);
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
}

module.exports = User;

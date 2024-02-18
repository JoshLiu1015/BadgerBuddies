const db = require("../config/db");
const bcrypt = require('bcrypt');
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
        return db.execute(sql)

    }
}

module.exports = User;

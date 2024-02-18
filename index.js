const express = require("express")
const app = express()

const mysql = require("mysql")
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "BadgerDatabase"

})


app.listen(3000, () => {
    console.log("server running");
})
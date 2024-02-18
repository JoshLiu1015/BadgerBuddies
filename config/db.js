require("dotenv").config()
const mysql = require("mysql2")

/*
A connection pool is a cache of database connections maintained
so that the connections can be reused when future requests to the
database are required. Connection pools are used to enhance the 
performance of executing commands on a database because creating
and closing a connection every time a query is made can be very
time-consuming, especially under heavy load.
*/

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});


/*
The promise() method is a feature of the mysql2 library.
It wraps the pool (or a connection from the pool)
to provide a way to interact with MySQL using Promises
instead of using callbacks, which is the traditional Node.js style.
you get an object that lets you execute SQL queries
and handle the results with .then() for success or
.catch() for errors, or within an async function using await.
*/

module.exports = pool.promise();
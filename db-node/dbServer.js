const express = require("express")
const app = express()

require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})

const mysql = require('mysql')
// mysql db
const db = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",       //This is your localhost IP
    user: "node_admin",         // "newuser" created in Step 1(e)
    password: "SonyBoom2022",  // password for the new user
    database: "userDB",      // Database name
    port: "3306"             // port name, "3306" by default
 })
 db.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)
 })
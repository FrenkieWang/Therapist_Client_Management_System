require('dotenv').config();

const mysql = require('mysql2'); // npm install mysql2

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}).promise(); // promise-based execution


console.log('SQL Connected');

module.exports = db;
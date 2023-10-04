const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "mayank1099",
  database: "appointmentsystem",
});

// Create User
exports.createUser;

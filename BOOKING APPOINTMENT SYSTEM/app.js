const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1", // Updated host to 127.0.0.1
  user: "root",
  password: "mayank1099",
  database: "appointmentsystem",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.post("/api/user", (req, res) => {
  const { name, email, phone_no } = req.body;
  const sql = "INSERT INTO user (name, email, phone_no) VALUES (?, ?, ?)";
  db.query(sql, [name, email, phone_no], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      res
        .status(500)
        .json({ error: "An error occurred while inserting the user." });
    } else {
      res.json({ message: "User inserted successfully." });
    }
  });
});

app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching users." });
    } else {
      res.json(result);
    }
  });
});

app.delete("/api/user/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM user WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    } else {
      res.json({ message: "User deleted successfully." });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

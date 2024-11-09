const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Define the POST route for /apply
app.post("/apply", (req, res) => {
    const { name, phone, email, statement } = req.body;
    
    // Simple query to insert form data into MySQL
    const query = `INSERT INTO applicants (name, phone, email, statement) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, phone, email, statement], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ message: "Failed to submit application" });
        } else {
            res.status(200).json({ message: "Application submitted successfully" });
        }
    });
});


app.get("/admin/applicants", (req, res) => {
    const query = "SELECT * FROM applicants";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ message: "Failed to retrieve applicants" });
        } else {
            res.status(200).json(results);
        }
    });
});

app.delete("/admin/applicants/:id", (req, res) => {
    const applicantId = req.params.id;
    const query = "DELETE FROM applicants WHERE id = ?";
    db.query(query, [applicantId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ message: "Failed to delete applicant" });
        } else {
            res.status(200).json({ message: "Applicant deleted successfully" });
        }
    });
});


app.put("/admin/applicants/:id", (req, res) => {
    const applicantId = req.params.id;
    const { name, phone, email, statement } = req.body;
    const query = `UPDATE applicants SET name = ?, phone = ?, email = ?, statement = ? WHERE id = ?`;
    db.query(query, [name, phone, email, statement, applicantId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ message: "Failed to update applicant" });
        } else {
            res.status(200).json({ message: "Applicant updated successfully" });
        }
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

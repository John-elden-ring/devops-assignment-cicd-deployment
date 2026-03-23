require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET /student-details
app.get("/student-details", (req, res) => {
  res.json({
    name: process.env.STUDENT_NAME || "Your Name",
    rollNumber: process.env.ROLL_NUMBER || "Your Roll Number",
    registerNumber: process.env.REGISTER_NUMBER || "Your Register Number",
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.get("/ping", (req, res) => {
    res.send("pong");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});  // Closing brace and parentheses added

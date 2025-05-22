const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = "./message.json";

app.get("/api/messages", (req, res) => {
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) return res.status(500).send("Error fetching messages.");
    res.json(JSON.parse(data));
  });
});
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});

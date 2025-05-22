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

app.post("/api/messages", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send("Message Field are required.");
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) return res.status(400).send("Error Reading File.");
    const messages = JSON.parse(data);
    messages.push({ message, time: new Date().toISOString() });

    fs.writeFile(FILE_PATH, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving messages");
      res.status(200).json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const { time } = require("console");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = "./contact.json";

app.get("/api/contact", (req, res) => {
  fs.readFile(FILE_PATH, (err, data) => {
    if (err)
      return res.status(400).json({ message: "Error fetching contacts." });
    res.json(JSON.parse(data));
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, phonenumber } = req.body;
  if (!name)
    return res.status(400).json({ message: "Name Field is required." });
  if (!email)
    return res.status(400).json({ message: "Email field is required." });
  if (!phonenumber)
    return res.status(400).json({ message: "Phone number is required." });

  fs.readFile(FILE_PATH, (err, data) => {
    if (err)
      return res.status(400).json({ message: "Error reading saved contacts." });

    const contacts = JSON.parse(data);
    contacts.push({ name, email, phonenumber, time: new Date().toISOString() });

    fs.writeFile(FILE_PATH, JSON.stringify(contacts, null, 2), (err) => {
      if (err)
        return res.status(400).json({ message: "Error saving contacts." });
      res.status(201).json({ message: "Successfully saving contact." });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

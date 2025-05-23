const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = "./todolist.json";

app.get("/api/todolist", (req, res) => {
  fs.readFile(FILE_PATH, (err, data) => {
    if (err)
      return res.status(400).json({ message: "Error fetching to do list" });
    res.json(JSON.parse(data));
  });
});
app.post("/api/todolist", (req, res) => {
  const { task, description, time_duration } = req.body;
  if (!task || !description || !time_duration)
    return res.status(400).json({ message: "All fields are required." });
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) return res.status(400).json({ message: "Error reading file." });
    const todolist = JSON.parse(data);
    todolist.push({ task, description, time_duration });
    fs.writeFile(FILE_PATH, JSON.stringify(todolist, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving message.");
      res.status(201).json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});

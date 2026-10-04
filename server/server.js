require('dotenv').config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

const port = process.env.PORT;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};
  app.get("/", (req, res) => {
  res.send("XOLVE DIGITAL CRM API is running");
});

startServer();  
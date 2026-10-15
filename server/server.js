require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};


const port = process.env.PORT;

app.use(express.json());

app.use("/api/users", userRoutes);




app.get("/", (req, res) => {
  res.send("XOLVE DIGITAL CRM API is running");
});

app.get("/test-error", (req, res, next) => {
  const error = new Error("This is a test error");

  next(error);
});

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer();
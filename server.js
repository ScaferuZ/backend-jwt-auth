const express = require("express");

// setup dotenv
require("dotenv").config();

const mongoose = require("mongoose");

const authRouter = require("./routes/authRouter");

app.use("/api/user", authRouter);

const port = process.env.PORT || 3000;

const app = express();

// to get req parameters
app.use(express.json());

// to get body parameters
app.use(express.urlencoded({ extended: true }));

// middleware
app.use((req, res, next) => {
  console.log("Req is made");
  console.log("Host name - " + req.hostname);
  console.log("Host name - " + req.path);
  console.log("Host name - " + req.method);
  next();
});

app.get("/", (req, res) => res.send("Hello world")); //sample API

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB database connection established");

    // once connected, start your express server on port 4000
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => {
    console.log("Error in connecting to MongoDB:" + err);
  });

const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

//import routes
const courseRoutes = require("./routes/courseRoutes");
const { RPCObserver } = require("./utils/message passing/rabbit_mq");

// MongoDB connection
require("./config/db");

const app = express();
app.use(cors());

// Define your routes and middleware here
// app.use(express.json());
app.use(bodyParser.json());

// Use the course routes
app.use('/course', courseRoutes);

port = process.env.PORT || 8004;
app.listen(port, () => {
  console.log(`course service is running on port ${port}`);
});

RPCObserver(process.env.COURSE_QUEUE_NAME);

app.get("/course/test", (req, res) => {
  res.send("Hello, World!");
});
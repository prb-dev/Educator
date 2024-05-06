const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

//import routes
const courseRoutes = require("./routes/courseRoutes");

// MongoDB connection
require("./config/db");

const app = express();
app.use(cors());

// Define your routes and middleware here
// app.use(express.json());
app.use(bodyParser.json());

// Use the course routes
app.use('/courses', courseRoutes);

port = process.env.PORT || 8007;
app.listen(port, () => {
  console.log(`Course management service is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
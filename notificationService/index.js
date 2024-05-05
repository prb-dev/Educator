const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailRoutes = require("./notificationRoutes/emailRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8007;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/send_email", emailRoutes);

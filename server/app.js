require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");

const connectDB = require("./database");

// This middleware is no longer needed because the CORS configuration below will handle all origins.
// app.all('*', (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://reading-test.vercel.app/");
//   next();
// });

app.use(
  cors({
    origin: true, // This will allow requests from any origin
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", require("./routes/UserRoute"));
app.use("/api/result", require("./routes/ResultRoute"));

app.listen(process.env.PORT, () => {
  connectDB();
  console.log('Server is running on ${process.env.IP}:${process.env.PORT}');
});
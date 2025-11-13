const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const captainRoutes = require("./routes/captain-routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

const port = process.env.PORT || 3000;

connectToDb().then(() => {
  app.listen(port, () => {
    console.log("Connected to DB | Server running on port:", port);
  });
});

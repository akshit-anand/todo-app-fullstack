const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT || 8001;
const todoRoutes = require("./routes/todo.routes.js");
const mongoose = require("mongoose");

const app = express();

// Parsing application/json
app.use(express.json());
// Parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());

dotenv.config();

// Connecting to the database
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to Database!"))
  .catch((err) => console.error("Something went wrong", err));

// const mongoDB = process.env.DB_URI;
// async function main() {
//   try {
//     await mongoose.connect(mongoDB);
//   console.log("Connected to Database!");
//   } catch (error) {
//     console.log("Something went wrong", error)
//   }

// }

// Initialize Routes imported from above
app.use(todoRoutes);

app.listen(port, () =>
  console.log(`Express Server is Running at http://localhost:${port}`)
);

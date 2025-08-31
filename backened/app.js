import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3003, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);

  connectDB();
});

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes); // goes to authRoute
app.use("/api/course", courseRoutes); // goes to courseRoute
app.use("/api/category", categoryRoutes); // goes to categoryRoute

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

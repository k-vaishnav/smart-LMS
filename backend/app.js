import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import passwordRoutes from "./routes/changePasswordRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type,Authorization"],
//   })
// );
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes); // goes to authRoute
app.use("/api/courses", courseRoutes); // goes to courseRoute
app.use("/api/category", categoryRoutes); // goes to categoryRoute
app.use("/api/payment", paymentRoutes); // goes to paymentRoute
app.use("/api/user", userRoutes);// goes to userRoute
app.use("/api/changepassword", passwordRoutes);// goes to passwordRoute
app.use("/api/cart", cartRoutes);// goes to cartRoute
app.use("/api/orders", orderRoutes);// goes to orderRoute

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.log(err);
  if(err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: "Internal Server Error" });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.listen(process.env.PORT || 3003, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  connectDB();
});

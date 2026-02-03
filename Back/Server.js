import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/users.js";
import dashboardRoutes from "./Routes/Adash.js";
import PdashboardRoutes from "./Routes/Pdash.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); 

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 
app.use('/api', dashboardRoutes);
app.use('/api', PdashboardRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server launched on ${PORT}`));
  })
  .catch(err => console.log(err));

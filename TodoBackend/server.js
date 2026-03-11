import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import cookieParser from "cookie-parser";
import refreshRoutes from "./routes/refresh.routes.js";




dotenv.config();

const app = express();

app.use(cors({origin:"https://mytodos-chi.vercel.app",credentials:true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/todos",todoRoutes);
app.use("/api/auth",refreshRoutes);



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


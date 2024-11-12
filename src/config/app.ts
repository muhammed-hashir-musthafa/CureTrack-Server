import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { EventEmitter } from "events";
import { adminRoutes } from "../routes/adminRoutes";
import { baseRoutes } from "../routes/baseRoutes";
import cookie from 'cookie-parser'

dotenv.config();

const app = express();
EventEmitter.setMaxListeners(20);

app.use(cookie())
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use("/api/admin", adminRoutes);
app.use("/api/", baseRoutes);

export default app;

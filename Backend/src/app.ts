import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Using Cors
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);
// Using cookieParser
app.use(cookieParser());
// setting json limit to 16kb
app.use(express.json({ limit: "16kb" }));
// setting urlencoded limit to 16kb, extended: true
app.use(express.urlencoded({ limit: "16kb", extended: true }));

export default app;

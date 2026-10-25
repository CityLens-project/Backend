import express from "express";
import "./lib/db/mongoose.js";
import { authRouter } from "./app/auth/auth.route.js";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

// global error handler
app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message,
    success: false,
    stack: err.stack,
  });
});

app.listen(3000, () => console.log("server is running on port 3000"));

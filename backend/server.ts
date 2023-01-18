import express from "express";
import mongoose, { connect, connection } from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Configurations
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Set up mongoose connection
const mongoDB = process.env.DB_KEY as string;
connect(mongoDB);
connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

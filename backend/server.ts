import express from "express";
import { connect, connection } from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import { router as formRouter } from "./routes/form";

// Configurations
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors);
app.use(express.static(path.join(__dirname, "public")));

app.get("/signup", formRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Set up mongoose connection
const mongoDBUri = process.env.DB_KEY as string;

connect(mongoDBUri).catch((error) =>
  console.log(`Error connecting to server: ${error}`)
);

const db = connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("connecting", function () {
  console.log("Attempting to connect to MongoDB");
});
db.once("open", function () {
  console.log("Connected to MongoDB successfully");
});

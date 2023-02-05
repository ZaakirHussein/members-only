import express from "express";
// import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { connect, connection } from "mongoose";
import { formRouter } from "./routes/formRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());

app.use("/signup", formRouter);

const connectoToDB = (() => {
  // Set up MongoDB connection
  const mongoDBUri = process.env.ATLAS_URI as string;

  connect(mongoDBUri).catch((error) =>
    console.log(`Error connecting to server: ${error}`)
  );

  const db = connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected to MongoDB successfully");
  });
})();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

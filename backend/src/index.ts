import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routers/todoRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URI as string)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

app.use(todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

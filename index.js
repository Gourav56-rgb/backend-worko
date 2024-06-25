import express from "express";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import NodeCache from "node-cache";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

export const myCache = new NodeCache();

const server = express();

server.listen(3000, () => {
  console.log("Server started running");
});

server.use(express.json());

server.use("/worko", userRoutes);

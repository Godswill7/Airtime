import express, { Application } from "express";
import { Database } from "./config/database";
import env from "dotenv"
env.config()

const port: number = parseInt(process.env.PORT!);
const app: Application = express();

const server = app.listen(port, () => {
Database()
});

process.on("uncaughtException", (error: Error | any) => {
  console.log(`Server is shutting down due to ${error.message}`);
  process.exit(1);
});
process.on("unhandledRejection", (reason: any) => {
  console.log(`Server is shutting down due to ${reason}`);
  server.close(() => {
    process.exit(1);
  });
});

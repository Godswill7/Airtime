import express, { Application } from "express";
import { Database } from "./config/database";

const port: number = 4000;
const app: Application = express();

const server = app.listen(port, () => {
Database()
});

process.on("uncaughtException", (error: Error | any) => {
  console.log(`Server is shutting down due to ${error}`);
  process.exit(1);
});
process.on("unhandledRejection", (reason: any) => {
  console.log(`Server is shutting down due to ${reason}`);
  server.close(() => {
    process.exit(1);
  });
});

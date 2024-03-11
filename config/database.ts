import { connect } from "mongoose";
import env from "dotenv";
env.config();

const DB = process.env.DATABASE_URL!;

export const Database = async () => {
  try {
    await connect(DB!).then(() => {
      console.log("Database Connected 🚀🚀🚀");
    });
  } catch (error: any) {
    console.log(`Error connecting to databse ... ${error.message}`);
  }
};

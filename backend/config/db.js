import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const db = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.set("strictQuery", true).connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;

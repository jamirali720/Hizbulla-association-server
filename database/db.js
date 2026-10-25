import mongoose from "mongoose";
import configs from '../configs/index.js'

const connectDB = async () => {
  try {
    await mongoose.connect(configs.databaseLocalUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;

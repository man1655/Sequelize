import mongoose from "mongoose";
import {createIndexes} from './indexs.js'
import { validateDataConsistency } from "../utils/dataQuality.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    const index=await createIndexes();
    const validate=await validateDataConsistency();
    const hasIssues = Object.values(validate).some(arr => arr.length > 0);
    if(hasIssues){
      console.log(validate)
    }else{
      console.log("ALL DATA ARE CORRECT")
    }
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;

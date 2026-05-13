import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

const url=process.env.MONGO_URL || "mongodb://localhost:27017/brainly";

export const connectDb=async()=>{
  try{
    await mongoose.connect(url);
    console.log("connected to database"); 
  }
  catch(err){
    console.log("error connecting to database",err);
  }   
}


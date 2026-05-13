import mongoose from "mongoose";

const contentSchema=new mongoose.Schema({
  link:String,
  type:String,
  title:String,
  description:String,
  tags:String,
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
},{ timestamps: true });
const contentModel=mongoose.model("contents",contentSchema);

export default contentModel;

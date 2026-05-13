import mongoose from "mongoose";

const linkSchema=new mongoose.Schema({
  hash:String,
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
});

const LinkModel=mongoose.model("links",linkSchema);

export default LinkModel;
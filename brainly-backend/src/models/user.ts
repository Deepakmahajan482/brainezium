import mongoose from "mongoose"
const user =new mongoose.Schema({
  username:{type:String, unique:true},
  password:{type:String, required:true}
});

const userModel=mongoose.model("users",user);
export default userModel;
import express from "express"
import Middleware from "./Middleware.js";
import userModel from "./models/user.js";
import contentModel from "./models/content.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { connectDb } from "./models/DbConnect.js";
import bcrypt from "bcrypt";
import z from "zod";
import crypto from "crypto";
import links from "./models/link.js"
import cors from "cors";

dotenv.config();

const secret = process.env.SECRET_KEY || "";
connectDb();
const app =express();
app.use(cors());
app.use(express.json());


// endpoint signin version 1.0.0 //done
app.post("/api/v1/signin",async(req,res)=>{
const username=req.body.username as string;
const password=req.body.password as string; 
const user=await userModel.findOne({username});
if(!user){
  return res.status(403).json({
    message:"Invalid credentials"
  })
}

const pass=user.password as string;

const isMatch=await bcrypt.compare(password,pass||"");
if(!isMatch){
  return res.status(403).json({
    message:"Password is incorrect"
  })
}
const token=jwt.sign({id:user._id},process.env.JWT_SECRET||"hello", {expiresIn:"2h"});
return res.status(200).json({
  message:"Login successful",
  token:token
});
})






//endpoint signup version 1.0.0 //done
app.post("/api/v1/signup",async(req,res)=>{
const schema=z.object({
  username:z.string().min(3).max(20),
  password:z.string().min(8).max(20).regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      {
        message:
          "Password must contain uppercase, lowercase, number and special character",
      }
    )
})
const validation=schema.safeParse(req.body);
if(!validation.success){
  return res.status(403).json({ 
    message:"Validation error",
    errors:validation.error.format()
  })
}
const {username,password}=validation.data;
const existingUser=await userModel.findOne({username});
if(existingUser){
  return res.status(403).json({
    message:"Username already exists"
  })

}
const hashedPassword=await bcrypt.hash(password,10);
const newUser=new userModel({
  username,password:hashedPassword
})
await newUser.save();
return res.status(200).json({
  message:"User created successfully"
})

}
)






// endpoint  for creating the content  //done
app.post("/api/v1/content",Middleware,async(req,res)=>{
const schema=z.object({
  link:z.string().url(),
  type:z.enum(["question","answer"])||z.string(),
  title:z.string().min(3).max(100),
  tags: z.string(),
  description:z.string().min(3).max(500).optional()
})

const validation=schema.safeParse(req.body);
if(!validation.success){
  return res.status(403).json({
    message:"Validation error",
    errors:validation.error.format()
  })
}
// @ts-ignore
const userId=req.userId;
const {link,type,title,tags,description}=validation.data;
const newContent=new contentModel({
  link,type,title,tags,description,userId
})
await newContent.save();
return res.status(200).json({
  message:"Content created successfully"
})
})






// get all content of a user //done
app.get("/api/v1/content",Middleware,async(req,res)=>{
  // @ts-ignore
  const userId=req.userId;
  const contents=await contentModel.find({userId});
  if(contents.length===0){
    return res.status(403).json({
      message:"No content found"
    })

  }
  return  res.status(200).json({
    message:"Content fetched successfully",
    contents
  })

})




//delete content of a user //done
app.delete("/api/v1/content",Middleware,async(req,res)=>{
  // @ts-ignore
  const userId=req.userId ;
  const contentId=req.body.contentId as string;
  const content=await contentModel.findOne({_id:contentId,userId});
  if(!content){
    return res.status(403).json({
      message:"Content not found"
    })
  }     
await contentModel.deleteOne({_id:contentId,userId});
return res.status(200).json({
  message:"Content deleted successfully"
})  
})




// public sharelink 
app.get("/api/v1/brain/public/:contentId",async(req,res)=>{
const contentId=req.params.contentId;
const content=await contentModel.findOne({_id:contentId});
if(!content){
  return res.status(403).json({
    message:"Content not found"
  })
}
return res.status(200).json({
  message:"Content fetched successfully",
  content
})
})



// whole content of the user  //done
app.post("/api/v1/share",Middleware,async(req,res)=>{
  const shareId=crypto.randomBytes(16).toString("hex");
  // @ts-ignore
  const  userId=req.userId;
  const check = await links.findOne({
       userId
  });
  if(check){
    return res.status(200).json({
      message:"link already generated",
      // @ts-ignore
      shareId:check.hash
    })
  }

  await links.create({
  hash:shareId,
  // @ts-ignore
  userId:req.userId
  })
  return res.status(200).json({
    message:"share link created successfully",
    shareId
  })
})

//done
app.get("/api/v1/share/:hash",async(req,res)=>{
  const hash=req.params.hash;
  const link=await links.findOne({hash});
  if(!link){
return res.status(403).json({
  message:"Invalid share link"
})
  }
  const content=await contentModel.find({userId:link.userId||""});
  return res.status(200).json({
    message:"Content fetched successfully",
    content
  })
}) 
// endpoint for sharing the content
app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
})

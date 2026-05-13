import type{Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
export function Middleware(req:Request,res:Response,next:NextFunction){
  const authHeader=req.headers.token as string;
  if(!authHeader){
    return res.status(401).json({
      message:"Unauthorized"
    })
  }
  
  const token=jwt.verify(authHeader,process.env.JWT_SECRET as string || "hello") as {id:string};
  // @ts-ignore
  req.userId=token.id;
  next();
}

export default Middleware;
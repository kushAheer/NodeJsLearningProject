import asyncHandler from "../utils/asyncHandler";
import { Jwt } from "jsonwebtoken";
import { User } from "../models/user.model";
export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    
        if(!token){
            throw new ApiError(401,"Unauthorized");
        }
    
        const decoededToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const userDetailsData = await User.findById(decoededToken._id).select("-password -refreshToken")
    
        if(!userDetailsData){
            throw new ApiError(404,"User not found");
        }
        req.user = userDetailsData;
        next();
    } catch (error) {
        throw new ApiError(401,"Unauthorized");
    }
})

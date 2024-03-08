import ApiError from "../utils/ApiEroor.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const resgisterUser = asyncHandler(async (req, res, next) => {
    //get user details
    //validation
    //check if user already exist
    //check for images,check for avatar
    //upload them to cloudinary
    //check upload data in cloudinary
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response

    const {username,email,fullname,password} = req.body;
    
    if(
        [fullname , email , username , password].some((field) => field?.trim() === undefined || field?.trim() === "")
    ){
        throw  new ApiError(400,"All Fields are required");
    }
    const existedUser = User.findOne({
        $or : [
            {username},
            {email}
        ] 
    })
    if(existedUser){
        throw new ApiError(409,"User already exist");
    }
    const avatarLocalPath = req.files.avatar[0]?.path;
    const coverImageLocalPath = req.files.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    
    if(!avatar){
        throw new ApiError(400,"Avatar is required");
    }
    const userCreated  = await User.create({
        fullname,
        username,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase(),
    })
    const userFound =  await User.findById(userCreated._id).select(
        "-password -refreshToken"
    );
    if(!userFound){
        throw new ApiError(500,"User not created");
    } 
    return res.status(201).json(
        new ApiResponse(200,userCreated,"User Created Successfully"))
});


export  {resgisterUser};
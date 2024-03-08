import ApiError from "../utils/ApiEroor.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId)=>
{
    try{
        const userData = await User.findById(userId);

        const refreshToken = userData.generateRefreshToken();

        const accessToken = userData.generateAccessToken();

        userData.refreshToken = refreshToken;
        await userData.save({validateBeforeSave : false});

        return {accessToken,refreshToken};


    }catch(err){
        throw new ApiError(500,"Something went wrong");
    }

}




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
    const existedUser = await User.findOne({
        $or : [
            {username},
            {email}
        ] 
    })
    if(existedUser){
        throw new ApiError(409,"User already exist");
    }
    const avatarLocalPath = req.files.avatar[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required");
    }
    let coverImageLocalPath;
    
    if(Array.isArray(req.files.coverImage)){
        coverImageLocalPath = req.files.coverImage[0].path ;
    }
 
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    
    if(!avatar){
        throw new ApiError(400,"Not Upload image to cloudinary");
    }
    
    const userCreated  = await User.create({
        fullname,
        username,
        avatar : avatar.url,
        coverImage : coverImage?.url || " ",
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

const loginUser = asyncHandler(async (req, res, next) => {
    //get user details -> req body
    //check if username exists in db
    //if user does not exsist, tell user to register
    //check if password is correct
    //generate access token
    //generate refresh token
    //send cookies
    //return response

    const {username,password,email} = req.body;
    
    if(!username || !email){
        throw new ApiError(400,"Username and Email is required");
    }
    const userData = await  User.findOne(
        {
            $or : [
                {username},
                {email}
            ]
        }
    )
    if(!userData){
        throw new ApiError(404,"User not found");
    }
    const isPassswordValid = await userData.isPasswordCorrect(password);
    if(!isPassswordValid){
        throw new ApiError(401,"Invalid Password");
    }

    const {accessToken , refreshToken} = await generateAccessAndRefreshToken(userData._id)

    const loggedInUserData = await User.findById(userData._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly : true,
        secure : true,
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user : loggedInUserData,
                accessToken,
                refreshToken,
            }
        )
        ,"User Logged In Successfully"
        )
            

    }
)

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set :{
                refreshToken : undefined,
            }
        }
    
    )
    
    const options = {
        httpOnly : true,
        secure : true,
    }
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User Logged Out Successfully"))
})




export  {resgisterUser ,loginUser,logoutUser};
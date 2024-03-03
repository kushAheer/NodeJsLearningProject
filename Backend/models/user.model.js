import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index : true
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname : {
            type: String,
            required: true,
            
            index : true,
            trim: true,
        },
        avatar : {
            type : String,
            required : true,
        },
        coverImage : {
            type : String,
        },
        watchHistory : {
            type : Schema.Types.ObjectId,
            ref : "Video"
        },
        password : {
            type: String,
            required: true,
        },
        refreshToken : {
            type : String,
        }
        
    },
    {timestamps: true}
);

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        
        this.password = bcrypt.hash(this.password, 10);
        
    }
    next();
});



export const User = mongoose.model("User", userSchema);
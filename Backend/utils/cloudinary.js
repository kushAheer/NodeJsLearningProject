import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.API_SECRET_CLOUDINARY, 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
            if(!localFilePath) return null;

            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type : "auto",
            }) 
            fs.unlinkSync(localFilePath)//Remove the locally save temporary file as the upload was successful

            return response;

    }catch(err){

        fs.unlinkSync(localFilePath)//Remove the locally save temporary file as the upload failed
        console.log("Error uploading to cloudinary",err);

    }
}

export default uploadOnCloudinary;


import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
            if(!localFilePath) return null;

            const response = await cloudinary.uploader.upload(lpocalFilePath,{
                resource_type : "auto",
            })
            return response;

    }catch(err){

        fs.unlinkSync(localFilePath)//Remove the locally save temporary file as the upload failed

    }
}




cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) { });

export default uploadOnCloudinary;


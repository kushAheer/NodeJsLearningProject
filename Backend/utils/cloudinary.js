import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret:  API_SECRET_CLOUDINARY,
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
            if(!localFilePath) throw new Error("Please provide a file path");

            const response = await cloudinary.uploader.upload(lpocalFilePath,{
                resource_type : "auto",
            })
            return response;

    }catch(err){

        fs.unlinkSync(localFilePath)//Remove the locally save temporary file as the upload failed
        console.log(err);
    
    }
}




cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });

export default uploadOnCloudinary;


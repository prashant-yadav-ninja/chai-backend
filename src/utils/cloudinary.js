import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadonCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null ;

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        // file has uploaded successfully
        console.log(response.url)

        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temp file as the upload fail
        return null 
    }
}

export {uploadonCloudinary}

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
        // console.log(response.url,'this is coming from cloudinary.js')
        // console.log('this is coming from cloudinary.js',response)

        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temp file as the upload fail
        return null 
    }
}

export {uploadonCloudinary}







// The `uploadonCloudinary` function returns a Promise that resolves to an object with the following properties:

// * `public_id`: The unique identifier of the uploaded image on Cloudinary.
// * `url`: The URL of the uploaded image on Cloudinary.
// * `secure_url`: The secure URL of the uploaded image on Cloudinary.
// * `width`: The width of the uploaded image in pixels.
// * `height`: The height of the uploaded image in pixels.
// * `format`: The format of the uploaded image (e.g., "jpg", "png").
// * `resource_type`: The type of the uploaded resource (e.g., "image").

// If the upload fails, the Promise will reject with an error object.

// In your example, the `uploadonCloudinary` function is called with the local file path of the uploaded avatar image. The function will then upload the image to Cloudinary and return a Promise that resolves to an object with the properties described above. You can then use the properties of this object to store the uploaded image in your database or use it in your application in other ways.

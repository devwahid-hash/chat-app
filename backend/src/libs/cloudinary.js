import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

const cloudinaryUpload=async(filePath)=>{
    try {
        cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const result=await cloudinary.uploader.upload(filePath)
       
return result.secure_url
    } catch (error) {
        console.log(`error in cloudinaryUpload${error}`)
           console.log('Error message:', error.message)
        throw new Error(`Cloudinary upload failed: ${error.message}`)
    }
}


export default cloudinaryUpload;
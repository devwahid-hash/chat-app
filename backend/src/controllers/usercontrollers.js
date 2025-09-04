import User from "../models/user.js"
import  cloudinaryUpload  from "../libs/cloudinary.js"
import fs from "fs"


export const getCurrentuser=async(req,res)=>{
try {
    let userId=req.userId
   let user=await User.findById(userId).select("-password")
   if(!user){
    return res.status(400).json({message:"user not found"})
   }

   return res.status(200).json(user)
} catch (error) {
    return res.status(500).json({message:`error in userController${error}`})
}
}


export const uploadImage=async(req,res)=>{
    try {
        const {userName}=req.body
        const file=req.file
        if(!file){
            return res.status(400).json({message:"no file uploaded"})
        }
        const filePath=file.path
        const cloudinary=await cloudinaryUpload(filePath)
        fs.unlinkSync(filePath)
        const userId=req.userId
        await User.findByIdAndUpdate(userId,{$set:{profilePic:cloudinary},userName})
        return res.status(200).json({message:"image uploaded successfully",cloudinary,userName})
    } catch (error) {
        return res.status(500).json({message:`error in uploadImage${error}`})
    }
}



export const getAllUsers=async(req,res)=>{
    try {
        const getAllUsers=await User.find({_id:{$ne:req.userId}})
        return res.status(200).json(getAllUsers)
    } catch (error) {
        return res.status(500).json({message:`error in getAllUsers${error}`})
    }
}
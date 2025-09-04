import { generateToken } from "../libs/authjwt.js"
import sendMail from "../libs/sendMail.js"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
export const registerUser=async(req,res)=>{
    try {
        
    const{userName,email,password}=req.body

    if(!userName || !email || !password){
        return res.status(401).json({message:"complete all inputs"})
    }
     const checkUser = await User.findOne({ email });

     if (checkUser) {
        return res.status(400).json({ message: "email already exists try another one" });
     }  
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
     
    const newUser=new User({
        userName,
        email,
        password:hashedPassword,
    })
  await newUser.save()
    generateToken(newUser._id , res)
    return res.status(201).json({
        email: newUser.email,
        userName: newUser.userName,
    })

  
  } catch (error) {
        console.log(`error in registerUser${error}`)
    }

}

export const loginUser=async(req,res)=>{
    try {
        
    
    const {email,password}=req.body
    const checkUser=await User.findOne({email})

    if(!checkUser){
      return res.status(401).json({message:"email is incorrect"})
    }

    const isPasswordCorrect=await bcrypt.compare(password,checkUser.password)
    if(!isPasswordCorrect){
        return res.status(401).json({message:"password is incorrect"})
    }
    generateToken(checkUser._id,res)
    res.status(201).json({
        userId:checkUser._id,
        email:checkUser.email
    })
    
    } catch (error) {
        console.log(`error in login contr${error}`)
    }
}

export const logoutUser=async(req,res)=>{
    res.cookie("jwt","")
    res.json({
        message:"loged out successfully"
    })
}

export const sentOtp=async(req,res)=>{
  try {
    

  const {email}=req.body
  const checkUser=await User.findOne({email})
  if(!checkUser){
    return res.status(404).json({message:"try another email User with this email does'nt exist"})
  }
  let otp=Math.floor(1000 +Math.random() *9000).toString();
    checkUser.generateOtp=otp,
  checkUser.otpExpires=new Date(Date.now() + 5 *60 *1000),
  checkUser.isOtpVerified=false

  await checkUser.save();
  
  sendMail(email,otp)
  return res.status(200).json({message:"otp send successfully"})
    } catch (error) {
    return res.status(500).json({message:`error in sentOtp ${error}`})
  }
}

export const verifyOtp=async(req,res)=>{
  try {
    
  
  const {otp,email}=req.body
   const checkUser=await User.findOne({email})
  if(!checkUser || checkUser.generateOtp != otp || checkUser.otpExpires < Date.now() ){
    return res.status(404).json({message:"Invaild OTP"})
  }
  checkUser.generateOtp=undefined,
  checkUser.otpExpires=undefined,
  checkUser.isOtpVerified=true
  await checkUser.save();
  return res.status(200).json({message:"otp verified successfully"})
  } catch (error) {
    return res.status(500).json({message:`error in verifyOtp ${error}`})
  }
}

export const resetPassword=async(req,res)=>{
  try {
    const {email,password}=req.body
  const checkUser=await User.findOne({email})
  if(!checkUser||checkUser.isOtpVerified == false ){
    return res.status(404).json({message:"Otp verification is required"})
  }
   const salt=await bcrypt.genSalt(10)
   const hashedPassword=await bcrypt.hash(password,salt)
   checkUser.password=hashedPassword
   checkUser.isOtpVerified=false

   await checkUser.save()
   return res.status(200).json({message:"reset Password succesfully"})
  } catch (error) {
    return res.status(500).json({message:`error in reset password ${error}`})
  }
}


export const googleAuth = async (req, res) => {
  try {
    const { userName, email } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({ userName, email });
      generateToken(user._id, res);

      return res.status(201).json({
        message: "User created successfully",
        userId: user._id,
        email: user.email,
      });
    }

    // If user exists → return 200
    generateToken(user._id, res);
    return res.status(200).json({
      message: "Welcome back! User already exists",
      userId: user._id,
      email: user.email,
    });

  } catch (error) {
    return res.status(500).json({ message: `Error in GoogleAuth: ${error}` });
  }
};

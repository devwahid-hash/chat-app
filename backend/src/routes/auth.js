import express from "express"
import { googleAuth, loginUser, logoutUser, registerUser, resetPassword, sentOtp, verifyOtp } from "../controllers/auth.js";

const router=express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logoutUser)

router.post("/sentotp",sentOtp)
router.post("/otpverify",verifyOtp)
router.post("/resetpassword",resetPassword)

router.post("/googleAuth",googleAuth)



export default router;
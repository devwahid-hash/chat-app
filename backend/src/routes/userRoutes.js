import express from "express";
import { isAuth } from "../middlewares/isauthMiddleware.js";
import { getAllUsers, getCurrentuser, uploadImage } from "../controllers/usercontrollers.js";
import upload from "../middlewares/multer.js";

const userRouter=express.Router()

 userRouter.get("/current",isAuth,getCurrentuser)
 userRouter.put("/upload",upload.single("image"),isAuth,uploadImage)

 userRouter.get("/getallusers",isAuth,getAllUsers)

 export default userRouter
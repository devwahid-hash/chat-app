import express from "express";
import { getMessages, sendMessage } from "../controllers/messagecontr.js";
import { isAuth } from "../middlewares/isauthMiddleware.js";
import upload from "../middlewares/multer.js";

const messageRouter=express.Router()

messageRouter.post("/sendMessage/:reciver",isAuth,upload.single("image"),sendMessage);
messageRouter.get("/getMessages/:reciver",isAuth,getMessages);

export default messageRouter;
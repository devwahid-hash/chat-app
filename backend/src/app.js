import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/auth.js";
import connectDb from "./libs/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieparser from "cookie-parser"
import messageRouter from "./routes/messageRoute.js";
dotenv.config();
connectDb();

const app=express()

app.use(express.json());
app.use(cookieparser())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/api/auth",router)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)
 const PORT=process.env.PORT

 app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
 })


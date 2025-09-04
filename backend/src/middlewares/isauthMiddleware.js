import jwt from "jsonwebtoken"

export const isAuth=async(req,res,next)=>{
    try {
        let token=req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"user is not authenticated to access this page"})
        }
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY)
        console.log(verifyToken)
       req.userId= verifyToken.userId
        next()
    } catch (error) {
          return res.status(500).json({message:`error in isauthMiddleware${error}`})
    }
}

import jwt from 'jsonwebtoken'

export const authVerifyMiddleware = async(req,res,next)=>{
    try {
        console.log("hello auth middleWare-------->")
        console.log(req.cookies);
        const token = req.cookies.accessToken;
        console.log(token);
        if(!token){
            return res.status(401).json({message: 'No token provided'});
        }
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        console.log("hello auth middleWare-------->completed")
        next();
    } catch (error) {
        console.log("Error while genrating token", error);
        return res.status(403).json({
            message: error.message
        });
    }
}
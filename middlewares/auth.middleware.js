// import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken"
// const isLoggedIN =async (req,res,next) =>{
//     const {token} = req.cookies;
//     if(!token){
//         return res.status(500).json({
//             success:true,
//             message:"Token is not valid"
//         })
//     }
//     const userDetails =await jwt.verify(token,process.env.JWT_Secret)
//     req.user = userDetails
//     next()
// }

// export default isLoggedIN;

const isLoggedIN =async (req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(400).json({
            success:false,
            message:"Invalid Token"
        })
    }

    const verifyToken = await jwt.verify(token,process.env.JWT_Secret);
    if(!verifyToken){
        res.status(400).json({
            success:false,
            message:"Invalid Token not VErified"
        })
    }
    req.user = verifyToken;
    next();
}

export default isLoggedIN;  
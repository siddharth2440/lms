import User from "../models/user.model.js";
// import AppError from "../utils/error.util.js";
import upload from "../middlewares/multer.middleware.js";
import cloudinary from "cloudinary"
import fs from "fs/promises"
import crypto, { verify } from "crypto"
import sendMail from "../utils/sendEmail.js";
import { brotliCompressSync } from "zlib";
import { log } from "console";
const cookieOptions = {
    maxAge:7*24*60*60*1000,  // 7 days
    httpOnly:true,
    secure:true
}

const register = async (req,res) =>{
    const {fullName,email,password} = req.body;

    console.log("API Aclled");
    if(!fullName || !email || !password){
        return res.status(400).json({
            success:false,
            message:"Please , Fill All The Columns"
        })
    }

    console.log(fullName);
    console.log(email);
    console.log(password);

    const checkMail = await User.findOne({email}).select('+password');
    if(checkMail){
        console.log("Email Already exists");
        return res.status(400).json({
            success:false,
            message:"E-Mail is already Exists"
        })
    }

    const user = new User({
        fullName,
        email,password,
    })
    console.log("Hii Mom");
    console.log(req.file);
    if(!req.file){
        console.log("File Not Found");
    }
    if(req.file){
        console.log(req.file);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                gravity:"faces",
                crop:"fill"
            })
            if(result){ 
                user.avatar.public_id=result.public_id,
                user.avatar.secure_url=result.secure_url

                //remove file from the server
                fs.rm(`uploads/${req.file.filename}`)
                console.log("file uploaded successfully");
            }
        } catch (error) {
            console.log("file is not there");
            return res.status(400).json({
                success:false,
                message:"File is not uploaded"
            })
        }
    }

    const token = await user.generateJWTToken();
    await user.save();

    res.cookie("token",token,cookieOptions);
    // console.log("Registered Successfully");
    return res.status(200).json({
        user,
        success:true,
        message:"User registered Successfully"
    })
}

const logout = (req,res)=>{
    res.cookie("token",null,{
        secure:true,
        httpOnly:true,
        maxAge:0
    })

    res.status(200).json({
        success:true,
        message:"Logout Successfully"
    })
}

const login =async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(404).json({
            success:false,
            message:"All fields are required"
        })
    }
    console.log("Reached");
    const isFound = await User.findOne({email}).select('+password');
    if(!isFound){
        return res.status(404).json({
            success:false,
            message:"User Doen't Exists, Please Try Again"
        })
    }

    console.log("user found");

    const checkPass = await isFound.comparePassword(password)
    if(!checkPass){
        return res.status(400).json({
            success:false,
            message:"Invalid Email or Password"
        })
    }

    console.log("Password is correct");

    isFound.password = undefined;
    const token = await isFound.generateJWTToken();
    res.cookie("token",token,cookieOptions);

    console.log("token is there");

    return res.status(200).json({
        status:true,
        message:"LoggedIn Successfully",
        isFound
    })
}

const getProfile =async (req,res)=>{
    // const {id} = req.user
    const {id} = req.params
    console.log(id);
    console.log("ID "+id);
    try {
        const userDetails = await User.findById(id)
        return res.status(200).json({
            success:true,
            message:"profile is there",
            userDetails
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Profile is not there"
        })
    }
}

const forgetPassword = async (req,res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            success:false,
            message:"Email is Required"
        })
    }
    const emailFound = await User.findOne({email});
    if(!emailFound){
        return res.status(400).json({
            success:false,
            message:"User doesn't exists"
        })
    }

    // createTemporary token 
    const token = await emailFound.generatePasswordResetToken();
    
    emailFound.save();
    const resetPasswordURI = `${FRONTENED_URI}/reset-password/${token}`

    //send email to an User
    try {
        const subject = "Reset Password"
        const message = `<a href=${resetPasswordURI} target="blank">ResetPassword</a>`
        await sendMail(email,subject,message)
        return res.status(200).json({
            success:true,
            message:"Email is sent to the user"
        })
    } catch (error) {
        emailFound.forgetPasswordToken = undefined;
        emailFound.forgetPasswordExpiry = undefined;

        await emailFound.save()
        return res.status(400).json({
            success:false,
            message:"Unable to send the URI"
        })
    }

}

const resetPassword = async(req,res)=>{
        const {token} = req.params

        const {password} = req.body;

        const forgotPasswordToken = await crypto.create("sha256").update(token).digest('hex');
        const user = await User.findOne(
            {forgotPasswordToken,
            forgetPasswordExpiry:{$gt:Date.now()}
        })

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Token Expired"
            })
        }

        user.password = password;
        user.forgotPasswordToken = undefined;
        user.forgetPasswordExpiry=undefined;
        user.save();
}

const changePassword=async (req,res)=>{
    const {newpassword,oldpassword} = req.body;

    const {id} = req.user
    if(!newpassword || !oldpassword){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    const user = await User.findById(id).select('+password');
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid User"
        })
    }

    const isPasswordValid = await user.comparePassword(oldpassword);
    if(!isPasswordValid){
        return res.status(400).json({
            success:false,
            message:"Invalid old password"
        })
    }

    user.password = newpassword;
    await user.save();

    user.password = undefined;

    return res.status(200).json({
        success:true,
        message:"Password updated Successfully"
    })  
}

const updateProfile =async (req,res)=>{
    const {id} = req.params;
    const {fullName,avatar} = req.body

    console.log("IDID"+id);
    // console.log("req.body is = "+req.body);
    const user = await User.findById(id)
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User Invalid"
        })
    }

    user.fullName = req.body.fullName

    console.log("User Found");
    if(req.file){
        console.log("File Found");
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)
        try {
            const result =await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                crop:"fill",
                gravity:"faces",
            })   

            if(result){
                user.avatar.public_id = result.public_id
                user.avatar.secure_url = result.secure_url
                //remove file from the server
                await user.save()
                fs.rm(`uploads/${req.file.filename}`)
            }
        } 
        catch (error) {
            return res.status(400).json({
                success:false,
                message:"File is unable to update"
            })
        }
    }
    await user.save();

    return res.status(200).json({
        success:true,
        message:"User Details Updated SuccessFully"
    })


}

export {
    register,
    login,
    logout,
    getProfile,
    forgetPassword,
    resetPassword,changePassword,updateProfile
}
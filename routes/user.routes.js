import { Router} from "express";
import {register,logout,login,getProfile,forgetPassword,resetPassword,changePassword,updateProfile} from "../controllers/user.controller.js"
import isLoggedIN from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = Router();

router.post("/register",upload.single('avatar'),register);
router.post("/login",login);
router.get("/logout",isLoggedIN,logout);
router.get("/me/:id",isLoggedIN,getProfile);
router.post("/forgot-password",forgetPassword); // check while we're doing our frontened framework
router.post("/reset-password/:resetToken",resetPassword); // check while we're doing our frontened framework
router.post("/change-password",isLoggedIN,changePassword);  
router.put("/update-profile/:id",isLoggedIN,upload.single('avatar'),updateProfile);

export default router;
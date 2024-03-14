import {Schema,model,mongo,connect} from "mongoose";
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken";
import crypto from "crypto"

const userSchema = new Schema({
    fullName:{
        type:"String",
        required:[true,"Name is required"],
        minLength:[5,"Name must be atleast 5 characters"],
        maxLength:[50,"Name should be less than 50 characcters"],
        lowercase:true,
        trim:true
    },
    email:{
        type:"String",
        required:[true,"EMail is required"],
        lowercase:true,
        trim:true,
        unique:true,
    },
    password:{
        type:"String",
        required:[true,"Your password is required"],
        minLength:[8,"password must be atleast 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:"String",
        },
        secure_url:{
            type:"String"
        }
    },
    role:{
        type:"String",
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgetPasswordToken:"String",
    forgetPasswordExpiry:"Date"

},{timestamps:true})


userSchema.pre('save',async function(next){
    try {
        if(!this.isModified('password')){
            return next();
        }
        this.password = await bcrypt.hash(this.password,10); 
        // console.log(this.password); 
    } catch (error) {
        console.log("error in userSChame"+error.message);
    }
})

userSchema.methods ={
    generateJWTToken:async function(){
        try {
            return jwt.sign(
                {id:this._id,email:this.email,subscription:this.subscription,role:this.role},
                process.env.JWT_secret,
                {
                    expiresIn:process.env.JWT_Expiry
                }
            )
        } catch (error) {
            console.log("CreateToken Error "+error.message);
        }
    },

    comparePassword:async function(plainTextPassword){
        try {
            // console.log(plainTextPassword);
            return await bcrypt.compare(plainTextPassword,this.password)
        } catch (error) {
            console.log(plainTextPassword+ "Error Message from comparePassword "+error.message);
        }
    },

    generatePasswordResetToken:async function(){
        const resetToken = await crypto.randomBytes(20).toString('hex');
        this.forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.forgetPasswordExpiry = Date.now()+15*60*1000  // 15mins from Now   

        return resetToken
    }
}

const User = model("User",userSchema);

export default User;
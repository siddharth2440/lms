import nodemailer from "nodemailer"
export const contactHere = async (req,res)=>{
    console.log("api called");
    // const {email} = req.body
    console.log(req.body);
    try {
        console.log("api called");
        const transporter = await nodemailer.createTransport({
            service:"gmail",
            secure:true,
            auth:{
                user:process.env.ADMIN_EMAIL,
                pass:process.env.ADMIN_APP_PASSWORD
            }
        })

        const mailOptions = {
            from:req.body.email,
            to:process.env.ADMIN_EMAIL,
            subject:"Message from the User",
            html:`${req.body.message} from ${req.body.username}`
        }

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    message:"Can't send the message"
                })
            }

            return res.status(200).json({
                success:true,
                message:"Sent message"
            }) 
        })
    } catch (error) {
        console.log("Error occuring in sending the message "+error.message);
    }
}
import nodemailer from "nodemailer";

const sendMail = async(email,subject,message)=>{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        secure:false,
        auth:{
            user:process.env.SMTP_USERNAME,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from:process.env.SMTP_USERNAME,
        to:email,
        subject:subject,
        html:message
    }

    await transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log("Error in Sending the MAil"+err.message);
        }else{
            console.log("Email Sent Successfully "+info.response);
        }
    })

}

export default sendMail;
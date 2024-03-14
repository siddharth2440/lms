import app from "./app.js";
import dbConnection from "./config/dbConnection.js";
import cloudinary from "cloudinary"

//cloudinary configuration
cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,  
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    dbConnection();
    console.log(`App is running at PORT ${PORT}`);
})
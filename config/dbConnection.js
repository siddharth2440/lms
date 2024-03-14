import mongoose from "mongoose";
mongoose.set('strictQuery',false);


const dbConnection = () =>{
    mongoose
        .connect(process.env.MONGO_URI)
        .then(()=>console.log("Connected to the DAtabase"))
        .catch((err)=>{
            console.log("unable to Connect with the DataBase"+err.message);
        })
}

export default dbConnection;
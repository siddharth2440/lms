import path from "path";
import multer, { diskStorage } from "multer";

const upload = multer({
    dest:"uploads/",
    limits:{
        fileSize:50*1024*1024
    },
    storage:diskStorage({
        destination:"uploads/",
        filename:(_req,file,cb)=>{
            cb(null,file.originalname)
        }
    }),
    fileFilter:(_req,file,cb)=>{
        let ext = path.extname(file.originalname);
        if(ext!==".jpg" && ext!==".jpeg" && ext!==".webp" && ext!==".png" && ext!==".mp4"){
            cb(new Error(`UnsupportedFile Type ${ext}`,false))
            return
        }
        console.log("File not Supported");
        cb(null,true)
    }
})

export default upload;
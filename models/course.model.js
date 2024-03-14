import {Schema,model} from "mongoose"

const courseSchema = new Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true,
        minLength:[8,"Title must be atleast of 8 characters"],
        maxLength:[59,'Title should be less than 60 characters']
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minLength:[10,"Title must be atleast of 8 characters"],
        maxLength:[200,'Title should be less than 60 characters']
    },
    category:{
        type:String,
        required:true,
        trim:true
    },  
    thumbnail:{
        public_id:{
            type:String,
            required:true
        },
        secure_url:{
            type:String,
            required:true
        }
    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
                public_id:{
                    type:String,
                    required:true
                },      
                secure_url:{
                    type:String,
                    required:true
                }
            }
        }
    ],
    numberOfLectures:{
        type:Number,
        default:0
    },
    createdBy:{
        type:String
    }
})

const courseModel = model("Course",courseSchema)

export default courseModel;
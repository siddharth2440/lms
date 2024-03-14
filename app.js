import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js"
import coursesRoutes from "./routes/course.routes.js"
// import errorMiddleWare from "./middlewares/error.middlware.js";
import misRoutes from "./routes/miscellaneous.routes.js"
const app = express();
config();

//body-parser
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb',extended:true}))

//cookie-parser for cookies
app.use(cookieParser());

//logger 
app.use(morgan('dev'));

cors
app.use(cors({
    origin:[process.env.FrontenedURI],
    credentials:true
}))


//routes-middlewares

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/contact',misRoutes);
app.use('/api/v1/courses',coursesRoutes);

// app.use(errorMiddleWare)

export default app;
// packages
import express from "express"
import path from "path"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"


// utils
import connectDB from "./utils/db.js"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"

import uploadRoute from "./routes/uploadRoute.js"

dotenv.config();

const port=process.env.PORT || 8000;

connectDB();

const app=express();


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use("/api/v1",userRoute)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/upload",uploadRoute)


app.use('/uploads',express.static(path.join(__dirname,"./uploads")))

const __dirname = path.resolve();
app.use(express.static(__dirname));

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})
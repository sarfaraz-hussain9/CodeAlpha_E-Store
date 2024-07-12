// packages
import express from "express"
import path from "path"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"


// utils
import connectDB from "./utils/db.js"
import userRoute from "./routes/userRoute.js"

dotenv.config();

const port=process.env.PORT || 8000;

connectDB();

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use("/api/v1",userRoute)


app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})
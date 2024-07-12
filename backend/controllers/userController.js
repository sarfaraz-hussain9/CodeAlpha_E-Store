import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler"

const signin=asyncHandler(async(req,res)=>{
    res.send("hello")
})

export {signin};
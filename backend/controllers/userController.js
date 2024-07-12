import userModel from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js"



const signup=asyncHandler(async(req,res,next)=>{
   const {username,email,password}=req.body;

   if(!username || !email || !password){
    throw new Error("please fill all the inputs")
   }

   const userExist=await userModel.findOne({email});

   if(userExist){
    res.status(400).send("user already exists")
   }

   
   try {
       const newUser=await userModel.create({
        username,
        email,
        password
       })
       // creating user
       createToken(res,newUser._id);

    res.status(200).json({
        _id:newUser._id,
        username:newUser.username,
        email:newUser.email,
        isAdmin:newUser.isAdmin
    })

    

   } catch (error) {
    res.status(400)
    throw new Error(error.message)
   }

})


export {signup};
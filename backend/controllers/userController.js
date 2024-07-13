import userModel from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";
import bcrypt from 'bcryptjs';


// signUp
const signup=asyncHandler(async(req,res)=>{
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


// signIn
const signin=asyncHandler(async(req,res)=>{
   const {email,password}=req.body;

   if(!email || !password){
    throw new Error("please enter email and password")
   }

   const user=await userModel.findOne({email});

   if(user){
       const validPass=await bcrypt.compareSync(password,user.password);

       if(validPass){
        // create token
        createToken(res,user._id);

        // send response
        res.status(200).json({
            _id:user._id,
            username:user.username,
            email:user.email,
            isAdmin:user.isAdmin
        })
        return;

       }else{
        res.status(500).send("Email or password is invalid")
       }
   
   }else{
    res.status(500).send("Email or password is invalid")
   }

})

// logout
const logout=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
    })
    res.status(200).json({message:"Logged out successfully"})
})

// get all user (Admin)
const getAllUser=asyncHandler(async(req,res)=>{
    const user=await userModel.find({});

    res.json(user);
})

// profile
const profile=asyncHandler(async(req,res)=>{

        const User=await userModel.findById(req.user._id);
    
        if(User){
            res.json({
                _id:User._id,
                username:User.username,
                email:User.email
            })
        }else{
            res.status(404)
            throw new Error("User not found")
        }

})

const updateProfile=asyncHandler(async(req,res)=>{
    

    const user=await userModel.findById(req.user._id);

    if(user){
        user.username=req.body.username || user.username;
        user.email=req.body.email || user.email;
        if(req.body.password){
            user.password=req.body.password;
        }
        const updatedUser=await user.save()
        
        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error("user not found")
    }
})
export {signup,signin,logout,getAllUser,profile,updateProfile};
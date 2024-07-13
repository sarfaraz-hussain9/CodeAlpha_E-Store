import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'
import dotenv from "dotenv"
dotenv.config();

const authenticate= asyncHandler(async(req,res,next)=>{

    // read jwt from 'jwt' cookie
    let token;
    token=req.cookies.jwt;

    if(token){
        try {
            const decoded= jwt.verify(token,process.env.JWT_SECRET)

            req.user=await userModel.findById(decoded.userId).select('-password');
            next();

        } catch (error) {
            res.status(401)
            throw new Error("Not authorized , token failed")
        }
    }else{
        res.status(401)
        throw new Error("Not authorized , no token")
    }
})


// check for admin
const authAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send("not authorized as an admin");
    }
}


export {authenticate,authAdmin}
import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password= bcrypt.hash(this.password,10)
})

const userModel=mongoose.model('User',userSchema);

export default userModel;
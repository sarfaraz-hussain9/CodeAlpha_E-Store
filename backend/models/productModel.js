import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps:true})

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    image:{
        type:String,
        required:true,
        default:"#",
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0,
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    
},{timestamps:true})

const product=mongoose.model('product',productSchema)

export default product;
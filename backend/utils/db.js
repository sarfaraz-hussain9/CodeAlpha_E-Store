import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL).then((data)=>{
            console.log(`database connected with ${data.connection.host}`);
        })
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

export default connectDB;
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

const app=express();
const port=process.env.PORT || 8000;

connectDB();

app.use(cors({
  origin: 'https://your-frontend-domain.onrender.com', // Replace with your actual frontend URL
  optionsSuccessStatus: 200,
}));

const __dirname = path.resolve();



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use("/api/v1",userRoute)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/upload",uploadRoute)

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/uploads',express.static(path.join(__dirname,"./uploads")))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});


app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})

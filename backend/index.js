import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './utils/db.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import uploadRoute from './routes/uploadRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/v1', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/upload', uploadRoute);

if(process.env.NODE_ENV==='production'){
    const __dirName=path.resolve();
    app.use(express.static(path.join(__dirName,'/frontend/dist')));

    app.use('/uploads', express.static(path.join(__dirname, './uploads')));
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirName,'frontend','dist','index.html')))
}else{
    app.get('/',(req,res)=> res.send('Server is Ready'))
}


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

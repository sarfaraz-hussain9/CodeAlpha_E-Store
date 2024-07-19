import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import uploadRoute from './routes/uploadRoute.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/v1', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/upload', uploadRoute);

// Serve static files from the React frontend in production
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    
    // Serve frontend static files
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

    // Serve uploaded files
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Handle all other routes
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html')));
} else {
    app.get('/', (req, res) => res.send('Server is Ready'));
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

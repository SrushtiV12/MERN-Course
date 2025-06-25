import dotenv from "dotenv";
import path from 'path';
import express from 'express';
import {connectDB} from './config/db.js';
import productRoutes from './routes/productroute.js';
dotenv.config();

connectDB().then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

const app = express();
const PORT = process.env.PORT || 8000

const __dirname = path.resolve(); // to get the current directory path
// Middleware to serve static files from the 'uploads' directory

app.use(express.json()); // to parse JSON data from request body
// Middleware to handle CORS

app.use("/api/products",productRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static('frontend/dist'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    })
}

app.listen(PORT, async () => {
    console.log("Server started at http://localhost:"+ PORT);
})
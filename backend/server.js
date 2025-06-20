//const express = request('express')

import dotenv from "dotenv";
dotenv.config();
import path from 'path';
//console.log("MONGO_URI from .env:", process.env.MONGO_URI);
import express, { json } from 'express';
import {connectDB} from './config/db.js';
import productRoutes from './routes/productroute.js';

const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve(); // to get the current directory path
// Middleware to serve static files from the 'uploads' directory

app.use(express.json()); // to parse JSON data from request body
// Middleware to handle CORS

//console.log(process.env.MONGO_URI);

app.use("/api/products",productRoutes)

if(process.env.NODE_ENV === "production") {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // Handle any requests that don't match the above routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(PORT,() => {
    connectDB();
    console.log("Server started at http://localhost:"+ PORT);
})


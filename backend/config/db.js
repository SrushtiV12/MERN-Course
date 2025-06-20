import mongoose from "mongoose"

console.log("MONGO_URI:", process.env.MONGO_URI);

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1); // 1 code means Exit the process with failure , 0 means success

    }
}


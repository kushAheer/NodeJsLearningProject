import mongoose from "mongoose";


const connectDB = async () => {
    try{
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`\nMongoDB connected: ${connectionInstance.connection.host}`);
        console.log("Database connected");
    }catch (e) {
        console.log(e.message);
        console.log("Error in connecting to the database");
    }
   

}

export default connectDB;
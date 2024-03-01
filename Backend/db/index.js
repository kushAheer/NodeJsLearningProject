import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async () => {
    try{
        
        const connectionInstance = await mongoose.connect("mongodb+srv://kushAheer:rasdiv2392@kushaheer.cdqz4ux.mongodb.net/kushAheer");
        console.log(`\nMongoDB connected: ${connectionInstance.connection.host}`);
        console.log("Database connected");
    }catch (e) {
        console.log(e.message);
        console.log("Error in connecting to the database");
    }
   

}

export default connectDB;
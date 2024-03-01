import dotenv from "dotenv";

import connectDB from "./db/index.js";

dotenv.config({
    path:"./env"
});



connectDB();

/*
import  express  from "express";

const app = express();

(async () => {
    try{

        await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`);
        app.on("error",()=>{
            console.log("Error in connecting to the database");

        })
        app.listen(process.env.PORT,()=>{
            console.log("Server is running on port "`${process.env.PORT}`);
        })

    }catch (e) {
        console.log(e.message);
        throw error
    }

})();
*/
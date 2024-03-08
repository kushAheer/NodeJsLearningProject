import path from "path";
import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";


dotenv.config()

connectDB()
.then(()=>{
    
    app.listen(process.env.PORT,()=>{
        console.log("Server is running on port ",process.env.PORT);
    });
    app.on("error",(e)=>{
        console.log("Error in connecting to the database",e);
    });
})
.catch((e)=>{
    console.log("Connection Failed",e);
    
});

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
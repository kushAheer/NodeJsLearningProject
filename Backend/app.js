import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());

app.use(express.json({
    limit: "20kb",
}));

app.use(urlencoded({
    extended : true,
    limit: "20kb",
}))
 
app.use(cookieParser());


//routes

//routes import

import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users",userRouter); //it is a good practise to define api version in the url

//http://localhost:3000/api/v1/users/register



// app.use(express.static('public'));

export default app;
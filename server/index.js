import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({});

//call db connection
connectDB();

const app = express();

//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));


//APIs
app.use("/api/v1/user",userRoute);

// app.get("/home",(_,res)=>{
//   res.status(200).json({
//     success:true,
//     message:"Hello I am coming from backend"
//   })
// })


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`Listening on port ${PORT}`);
})
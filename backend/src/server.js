import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js"
import { connectDB } from "./config/db.js"
import cors from "cors";
import dns from "node:dns";

dotenv.config()
const app=express();
const port=process.env.PORT || 3000
dns.setServers(["1.1.1.1","8.8.8.8"])
app.use(cors(
    {
        //origin:'http://localhost:5173'
    }
))
// app.get('/',(req,res)=>{
//     res.status(200).json("Hello")
//     console.log('Hello')
// })
// app.listen(port,() => {
//     console.log(`http://localhost:${port}`)
// })
app.use(express.json())
app.use("/Products", productRoutes)
connectDB().then(() =>{
    app.listen(port,() =>{
        console.log(`http://localhost:${port}/Products`)
    })
})

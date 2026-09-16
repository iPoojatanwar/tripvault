import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { route } from './routes/auth.route.js'

dotenv.config()

const port= process.env.PORT  
const mongodb=process.env.DATABASE_URL

 const app= express()
 app.use(express.json())
 app.use(cors())
 
 
app.get('/',(req,res)=>{res.status(200).json({message:"TripVault API IS RUNNING"})})
app.use('/api/auth',route)

    const startServer= async()=>{
        try {   
        await mongoose.connect(mongodb)
        console.log("Database connect successfully")
         app.listen( port,()=>{console.log(`Server run on the port ${port}`)})
    }
catch (error) {
    console.error("Mongodb connection failed",error.message)
    
}}
startServer()

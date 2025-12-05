import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js';
import routes from './routes.js'
import "./src/models/Project.model.js"
dotenv.config();
const app=express()
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api',routes)


app.listen(process.env.PORT,()=>{
  console.log(`server starts at http://localhost:${process.env.PORT}`)
})
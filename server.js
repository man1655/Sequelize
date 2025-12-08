import express from 'express'
import cors from 'cors'
import sequelize from './src/config/db.js'
import './src/models/Association.js'
import dotenv from 'dotenv'
import routes from './routes.js'
dotenv.config();
const app=express()


app.use(cors());
app.use(express.json());

sequelize.sync() 
  .then(() => console.log("Database connected & associations applied"))
  .catch(err => console.error(err));

app.use('/api',routes)
app.get('/',(req,res)=>{
res.send("Hello How Are You");
}
)

app.listen(process.env.PORT,()=>{
  console.log(`server starts at http://localhost:${process.env.PORT}`)
})
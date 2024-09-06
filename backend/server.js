import express from 'express'

const app  =express();

import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
dotenv.config();

app.use(express.json());


const PORT  = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.send("Hii")
})

app.use('/api/auth',authRoutes);


app.listen(PORT,()=>{
    connectToMongoDB();

    console.log(`Server running on port ${PORT}`);

})
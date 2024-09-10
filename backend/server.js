import express from 'express'

const app  =express();

import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';


const PORT  = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());



app.get('/',(req,res)=>{
    res.send("Hii")
})

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);


app.listen(PORT,()=>{
    connectToMongoDB();

    console.log(`Server running on port ${PORT}`);

})
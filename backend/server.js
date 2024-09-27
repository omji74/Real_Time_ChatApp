import express from 'express'

const app  =express();


import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js'
import cors from 'cors';

const PORT  = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:3000', // Your frontend's origin
  credentials: true, // If you're using cookies or sessions
}));


dotenv.config();

app.use(express.json());
app.use(cookieParser());



app.get('/',(req,res)=>{
    res.send("Hii")
})

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);


app.listen(PORT,()=>{
    connectToMongoDB();

    console.log(`Server running on port ${PORT}`);

})
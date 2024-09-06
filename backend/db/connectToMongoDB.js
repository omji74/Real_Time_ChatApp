import mongoose from 'mongoose';

const connectToMongoDB = async () =>{
    try{
            await mongoose.connect(process.env.MONGO_DB_URI);
            console.log("Connected to Database ");

    }
    catch(err){
        console.log("Ohhh mongoose connection error",err);
        

    }
}

export default connectToMongoDB;
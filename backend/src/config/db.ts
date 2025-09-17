import mongoose from 'mongoose';


const connectDB = async () => {
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`database connected to host ${conn.connection.host}`);

    }catch(error){
        console.error(`Couldn't connect to DB`);
    }
};

export default connectDB;
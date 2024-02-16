import mongoose from "mongoose";
import  {DB_NAME}  from "../constants.js";

const connectDB = async function(){
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // console.log('MONGODB connected !!!! ',connectionInstance);
        console.log('MONGODB connected !!!!',connectionInstance.connection.host);
    } catch (error) {
        console.log("ERRor",error)
        process.exit(1)
    }
}

export default connectDB ;
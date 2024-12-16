import mongoose from "mongoose";
import dotenv from "dotenv";
import Logger from "../utils/logger.js";
import { handleMongoError } from "../error-handling/mongoHandler.js";

dotenv.config();

const connectToMongo = async ()=>{

  const mongoURI = process.env.MONGODB_URI || "mongodb+srv://aattreyaks:pbslDQ0GQnIczEdZ@cluster0.oviiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try{
    if(!mongoURI){
      throw new Error("MONGODB_URI env var not defined");
    }
    await mongoose.connect(mongoURI);
    Logger.info("DB connected...");

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      Logger.info('Mongoose connection closed through app termination');
      process.exit(0);
    });
  }catch(error){
    Logger.error("Failed to init. MongoDB connection...");
    handleMongoError(error);
  }
}

export default connectToMongo;
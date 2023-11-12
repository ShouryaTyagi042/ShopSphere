import mongoose from 'mongoose';
import "dotenv/config";

const uri = process.env.MONG0_URI!
async function dbConnect(): Promise<void> {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB !\n");
  } catch (error) {
    throw error;
  }
}

export default dbConnect;
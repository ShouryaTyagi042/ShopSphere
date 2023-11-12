import mongoose from 'mongoose';
const MONG0_URI = "mongodb+srv://shouryatyagi042:dAsfOrPqYGxuk0O7@zaapibackendchallenge0.czkkavh.mongodb.net/?retryWrites=true&w=majority"


async function dbConnect(): Promise<void> {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONG0_URI);
    console.log("Connected to MongoDB !\n");
  } catch (error) {
    throw error;
  }
}

export default dbConnect;
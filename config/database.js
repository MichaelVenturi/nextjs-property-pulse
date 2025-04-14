import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true); // ensures only fields specified in the schema will be saved to the db

  // if the databse is already connected, dont connect again
  if (connected) {
    console.log("Already connected to MongoDB");
    return;
  }

  // connect
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    connected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;

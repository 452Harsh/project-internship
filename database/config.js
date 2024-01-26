import mongoose from "mongoose";
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with data base , error.message");
  }
};
export default connection;

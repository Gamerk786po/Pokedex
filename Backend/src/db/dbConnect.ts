import mongoose from "mongoose";
// func
const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}`
    );
    console.log(
      `MongoDB connected successfully. ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Connection failed", error);
  }
};
export default dbConnect;

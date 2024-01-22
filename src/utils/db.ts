import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (process.env.URI) {
      await mongoose.connect(process.env.URI);
      console.log("Db connected");
    } else {
      console.log("error connecting db");
    }
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

export default connectDb;

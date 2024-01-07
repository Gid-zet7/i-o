import mongoose from "mongoose";
import Department from "@/models/departmentModel";
import UserModel from "@/models/userModel";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export { Department };
export { UserModel };

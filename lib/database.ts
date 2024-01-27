import mongoose from "mongoose";
import Department from "@/models/departmentModel";
import UserModel from "@/models/userModel";
import Employee from "@/models/employeeModel";
import Manager from "@/models/managerModel";
import Project from "@/models/projectModel";
import AppraisalForm from "@/models/appraisalFormModel";
import Meeting from "@/models/meetingModel";
import Performance from "@/models/performanceModel";

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
export { Employee };
export { Manager };
export { Project };
export { AppraisalForm };
export { Meeting };
export { Performance };

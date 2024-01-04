import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface EmployeeInterface {
  user: mongoose.Types.ObjectId | null | undefined;
  department: string;
  position: string;
  skills: string[];
  performance: mongoose.Types.ObjectId[];
  startDate: Date;
  endDate?: Date;
}

const employeeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    department: { type: String, require: true },
    position: { type: String, require: true },
    skills: [String],
    performance: [{ type: Schema.Types.ObjectId, ref: "performance" }],
    startDate: { type: Date, require: true },
    endDate: { type: String, require: false },
  },
  { timestamps: true }
);

const Employee =
  mongoose.models.employee ||
  mongoose.model<EmployeeInterface>("employee", employeeSchema);

export default Employee;

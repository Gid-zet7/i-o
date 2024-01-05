import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeSchema = new Schema<Employee>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    department: { type: Schema.Types.ObjectId, ref: "department" },
    position: { type: String, require: true },
    skills: [String],
    performance: [{ type: Schema.Types.ObjectId, ref: "performance" }],
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: false },
  },
  { timestamps: true }
);

const Employee =
  mongoose.models.employee ||
  mongoose.model<Employee>("employee", employeeSchema);

export default Employee;

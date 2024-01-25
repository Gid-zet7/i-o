import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeSchema = new Schema<Employee>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, required: true, minlength: 3 },
    department: { type: Schema.Types.ObjectId, ref: "department" },
    position: { type: String, require: true },
    skills: [{ skill: String }],
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

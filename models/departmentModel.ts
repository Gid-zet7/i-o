import mongoose from "mongoose";

const Schema = mongoose.Schema;

const departmentSchema = new Schema<Department>(
  {
    name: { type: String, required: true },
    head_of_department: [{ type: Schema.Types.ObjectId, ref: "manager" }],
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Department =
  mongoose.models.department ||
  mongoose.model<Department>("department", departmentSchema);

export default Department;

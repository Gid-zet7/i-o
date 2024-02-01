import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeSchema = new Schema<Employee>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, required: true, minlength: 3 },
    bio: { type: String, required: true, maxlength: 200 },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    contact: { type: String, required: true },
    permanent_address: { type: String, required: true },
    current_address: { type: String, required: true },
    birthday: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: "department" },
    position: { type: String, require: true },
    skills: [{ skill: String }],
    experience: [{ position: String, startDate: String, endDate: String }],
    education: [
      {
        school: String,
        certificate: String,
        startDate: String,
        endDate: String,
      },
    ],
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

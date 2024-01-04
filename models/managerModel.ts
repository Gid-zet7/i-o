import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface ManagerInterface {
  employee: mongoose.Types.ObjectId | null | undefined;
  team: mongoose.Types.ObjectId[];
  projects: string[];
  meetings: mongoose.Types.ObjectId[];
}

const managerSchema = new Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "employee" },
    team: [{ type: Schema.Types.ObjectId, ref: "employee" }],
    projects: [String],
    meetings: [{ type: Schema.Types.ObjectId, ref: "meeting" }],
  },
  { timestamps: true }
);

const Manager =
  mongoose.models.manager ||
  mongoose.model<ManagerInterface>("manager", managerSchema);

export default Manager;

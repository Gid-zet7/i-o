import mongoose from "mongoose";

const Schema = mongoose.Schema;

const managerSchema = new Schema<Manager>(
  {
    employee: { type: Schema.Types.ObjectId, ref: "employee" },
    team: [{ type: Schema.Types.ObjectId, ref: "employee" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "project" }],
    meetings: [{ type: Schema.Types.ObjectId, ref: "meeting" }],
  },
  { timestamps: true }
);

const Manager =
  mongoose.models.manager || mongoose.model<Manager>("manager", managerSchema);

export default Manager;

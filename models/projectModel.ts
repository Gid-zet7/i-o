import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  startDate: { type: Date, default: Date.now },
  tasks: [
    {
      description: String,
      dueDate: Date,
      completed: { type: Boolean, default: false },
    },
  ],
});

const Project =
  mongoose.models.project || mongoose.model("project", projectSchema);
export default Project;

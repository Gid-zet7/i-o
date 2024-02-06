import mongoose from "mongoose";

const Schema = mongoose.Schema;

const performanceSchema = new Schema<Performance>(
  {
    title: { type: String, require: true },
    employee: { type: Schema.Types.ObjectId, ref: "employee" },
    date: { type: Date, require: true },
    feedback: { type: String, require: true },
    ratings: { type: Number, require: false },
    data: [
      {
        question: { type: String, required: true },
        response: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Performance =
  mongoose.models.performance ||
  mongoose.model<Performance>("performance", performanceSchema);

export default Performance;

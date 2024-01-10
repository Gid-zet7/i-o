import mongoose from "mongoose";

const Schema = mongoose.Schema;

const performanceSchema = new Schema<Performance>(
  {
    employee: { type: Schema.Types.ObjectId, ref: "employee" },
    date: { type: Date, require: true },
    feedback: { type: String, require: true },
    ratings: { type: Number, require: true },
  },
  { timestamps: true }
);

const Performance =
  mongoose.models.performance ||
  mongoose.model<Performance>("performance", performanceSchema);

export default Performance;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface PerformanceInterface {
  employee: mongoose.Types.ObjectId | null | undefined;
  date: Date;
  feedback: string;
  ratings: number;
}

const performanceSchema = new Schema(
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
  mongoose.model<PerformanceInterface>("performance", performanceSchema);

export default Performance;

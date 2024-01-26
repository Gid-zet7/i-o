import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appraisalSchema = new Schema<Forms>(
  {
    employeeName: { type: String, require: true },
    position: { type: String, require: true },
    department: { type: String, require: true },
    dateOfReview: { type: Date, require: true },
    typeOfReview: { type: String, require: true },
    questions: [
      {
        questionText: { type: String, required: true },
        questionType: { type: String, required: true },
        options: [{ optionText: String }],
        open: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const AppraisalForm =
  mongoose.models.appraisalForm ||
  mongoose.model<Forms>("appraisalForm", appraisalSchema);

export default AppraisalForm;

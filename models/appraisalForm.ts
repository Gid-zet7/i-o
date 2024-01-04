import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface AppraisalFormInterface {
  form_title: string;
  form_desc: string;
  questions: {
    questionText: string;
    questionType: string;
    options: { opyionText: string }[];
    open: boolean;
  }[];
}

const appraisalSchema = new Schema(
  {
    form_title: { type: String, require: true },
    form_desc: { type: String, require: true },
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
  mongoose.model<AppraisalFormInterface>("appraisalForm", appraisalSchema);

export default AppraisalForm;

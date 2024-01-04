import mongoose from "mongoose";

const Schema = mongoose.Schema;

const meetingSchema = new Schema<Meeting>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: "employee" }],
    agenda: { type: String, required: true },
  },
  { timestamps: true }
);

const Meeting =
  mongoose.models.meeting || mongoose.model<Meeting>("meeting", meetingSchema);

export default Meeting;

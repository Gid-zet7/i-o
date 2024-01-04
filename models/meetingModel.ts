import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface MeetingInterface {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  participants: mongoose.Types.ObjectId[];
  agenda: string;
}

const meetingSchema = new Schema(
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
  mongoose.models.meeting ||
  mongoose.model<MeetingInterface>("meeting", meetingSchema);

export default Meeting;

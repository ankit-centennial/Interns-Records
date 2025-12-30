import { model, Schema, Types } from "mongoose";

type CandidateStatus =
  | "busy"
  | "interested"
  | "no response"
  | "no incoming service";

interface ICandidate {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  status: CandidateStatus;
  joiningDate: Date;
  duration: string;
  jobBoard: string;
  jobPostedDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const candidateSchema = new Schema<ICandidate>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["busy", "interested", "no response", "no incoming service"],
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    jobBoard: {
      type: String,
      required: true,
    },
    jobPostedDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Candidate = model<ICandidate>("Candidate", candidateSchema);

export default Candidate;

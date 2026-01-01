import { model, Schema, Types } from "mongoose";

type CandidateStatus =
  | ""
  | "busy"
  | "interested"
  | "no response"
  | "no incoming service"
  | "rejected";

interface ICandidate {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  status?: CandidateStatus;
  joiningDate?: Date;
  duration?: string;
  jobBoard: string;
  jobPostedDate: Date;
  appliedDate: Date;
  jobPostedBy: string;
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
      enum: [
        "",
        "busy",
        "interested",
        "no response",
        "no incoming service",
        "rejected",
      ],
    },
    joiningDate: {
      type: Date,
    },
    duration: {
      type: String,
    },
    jobBoard: {
      type: String,
      required: true,
    },
    jobPostedDate: {
      type: Date,
      required: true,
    },
    appliedDate: {
      type: Date,
      required: true,
    },
    jobPostedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Candidate = model<ICandidate>("Candidate", candidateSchema);

export default Candidate;

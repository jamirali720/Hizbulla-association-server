import { Schema, model } from "mongoose";



const wardCommitteeSchema = Schema(
  {
    unionCommittee: {
      type: Schema.Types.ObjectId,
      ref: "Union",
      required: true,
    },
    wardId: {
      type: String,
      required: true,
    },
    wardName: {
      type: String,
      required: true,
      trim: true,
    },
    committeeName: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);


const WardCommittee = model("WardCommittee", wardCommitteeSchema);
export default WardCommittee;

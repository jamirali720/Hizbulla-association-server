import { Schema, model } from "mongoose";

const wardCommitteeSchema = Schema(
  {
    unionId: {
      type: String,
      required: true,
    },
    wardId: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
      trim: true,
    },
    committee: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    sorting: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);


const Ward = model("Ward", wardCommitteeSchema);
export default Ward;

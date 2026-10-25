import { Schema, model } from "mongoose";

const unionSchema = new Schema(
  {
    upazilaCommittee: {
      type: Schema.Types.ObjectId,
      ref: "Upazila",
      required: true,
    },
    unionId: {
      type: String,
      required: true,
    },
    unionName: {
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

const Union = model("Union", unionSchema);
export default Union;

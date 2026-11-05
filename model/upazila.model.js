import { Schema, model } from "mongoose";

const upazilaSchema = new Schema(
  {
    upazilaId: {
      type: String,
      required: true,
    },
    upazila: {
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
    status: {
      type: String,
      enum: ["pending", "approved", "active", "expired"],
      default: "pending",
    },
    sorting: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Upazila = model("Upazila", upazilaSchema);
export default Upazila;

import { Schema, model } from "mongoose";

const upazilaSchema = new Schema(
  {
    upazilaId: {
      type: String,
      required: true,
    },
    upazilaName: {
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

    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "active", "expired"],
      default: "draft",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true },
);

const Upazila = model("Upazila", upazilaSchema);
export default Upazila;

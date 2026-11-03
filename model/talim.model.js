import { Schema, model } from "mongoose";

const talimSchema = new Schema(
  {
    phone: {
      type: String,
      required: [true, "User phone number required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\d{11}$/.test(v); // Validate 11-digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    upazila: {
      type: String,
      required: [true, "Upazila is required"],
      trim: true,
      default: "Titas",
    },
    union: {
      type: String,
      required: [true, "Union is required"],
      trim: true,
    },
    ward: {
      type: String,
      default: 0,
    },
    village: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    masjid: {
      type: String,
      required: [true, "Masjid Name is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      trim: true,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

export const Talim = model("Talim", talimSchema);

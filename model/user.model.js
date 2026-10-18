import { Schema, model } from "mongoose";

import bcrypt from "bcrypt";
import { unionNames, userPosts, userRoles, wardNumbers } from "../utils/helper";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 3 characters"],
      select: false, // Exclude password from query results by default
    },
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

    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
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
      enum: [...unionNames], // Validate against the unionNames enum
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    userPost: {
      type: String,
      trim: true,
      enum: [...userPosts],
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    wardNo: {
      type: String,
      default: 0,
      enum: [...wardNumbers],
    },
    role: {
      type: String,
      default: "মুরিদ",
      enum: [...userRoles],
    },
    image: {
      url: {
        type: String,
        required: [true, "Image URL is required"],
      },
      public_id: {
        type: String,
        required: [true, "Public ID is required"],
      },
    },
  },
  { timestamps: true },
);

// password hashing before saving user
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS);
  if (this.email === process.env.ADMIN_EMAIL) {
    this.role = "admin";
  }
  next();
});

export const User = model("User", userSchema);

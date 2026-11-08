import { Schema, model } from "mongoose";

import bcrypt from "bcryptjs";

import dotenv from "dotenv";
dotenv.config();



const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, "User ID is required"],
      trim: true,
    },
    nidNo: {
      type: String,      
      default:""
    },
    formNo: {
      type: String,      
      default:""
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 3 characters"],
      // select: false, // Exclude password from query results by default
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
    },
    village: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    ward: {
      type: String,
      default: 0,
    },
    role: {
      type: String,
      default: "user",
      
    },
    position: {
      type: String,
      default: "মুরীদ",
    }    
  },
  { timestamps: true },
);

// password hashing before saving user
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  if (this.phone === process.env.ADMIN_PHONE) {
    this.role = "admin";
  }
  // next();
});

export const User = model("User", userSchema);

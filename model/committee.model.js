import { Schema, model } from "mongoose";

const committeeUserSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
     
    members: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          designation: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      default: [],
    }, 
    committeeLevel: {
      type: String,
      required: true,
      enum: ["উপজেলা", "ইউনিয়ন", "ওয়ার্ড"], // এই ৩টির যেকোনো একটি হবে
    },
    // ২. জেলা এবং উপজেলা সবার জন্যই বাধ্যতামূলক (Required)
    district: {
      type: String,
      required: true,
    },
    upazila: {
      type: String,
      required: true,
    },
    // ৩. ইউনিয়ন শুধুমাত্র Union ও Ward লেভেলের জন্য বাধ্যতামূলক
    union: {
      type: String,
      required: function () {
        return (
          this.committeeLevel === "ইউনিয়ন" || this.committeeLevel === "ওয়ার্ড"
        );
      },
    },
    // ৪. ওয়ার্ড শুধুমাত্র Ward লেভেলের জন্য বাধ্যতামূলক
    ward: {
      type: String,
      required: function () {
        return this.committeeLevel === "ওয়ার্ড";
      },
    },
  },
  { timestamps: true },
);

const CommitteeUser = model("CommitteeUser", committeeUserSchema);
export default CommitteeUser;

const mongoose = require("mongoose");

const committeeMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    designation: { type: String, required: true },
    committeeLevel: {
      type: String,
      required: true,
      enum: ["Upazila", "Union", "Ward"],
    },
    district: { type: String, required: true },
    upazila: { type: String, required: true },
    union: {
      type: String,
      required: function () {
        return (
          this.committeeLevel === "Union" || this.committeeLevel === "Ward"
        );
      },
    },
    ward: {
      type: String,
      required: function () {
        return this.committeeLevel === "Ward";
      },
    },
    // গ্রাম সার্চ করার জন্য ফিল্ডটি যুক্ত করা হলো
    village: { type: String },
  },
  { timestamps: true },
);

// 🚀 কাস্টম স্ট্যাটিক সার্চ মেথড (Static Method for Searching)
committeeMemberSchema.statics.searchMembers = function (searchParams) {
  let query = {};

  // ১. ইউনিয়ন, ওয়ার্ড এবং গ্রামের জন্য সরাসরি/শর্ত সাপেক্ষ ম্যাচিং
  if (searchParams.union) {
    query.union = { $regex: searchParams.union, $options: "i" }; // 'i' দিয়ে case-insensitive করা হয়েছে (যেমন: small/capital letter ম্যাটার করবে না)
  }

  if (searchParams.ward) {
    query.ward = searchParams.ward; // ওয়ার্ড সাধারণত নির্দিষ্ট নম্বর হয় (যেমন: "02" বা "2")
  }

  if (searchParams.village) {
    query.village = { $regex: searchParams.village, $options: "i" };
  }

  // ২. ইউজার মডেলের ভেতরে থাকা 'name' এবং 'phone' দিয়ে সার্চ করার ট্রিক:
  // যেহেতু name এবং phone আছে 'User' মডেলে, তাই এই মডেলে সরাসরি সার্চ করা যাবে না।
  // তবে আমরা 'user' ফিল্ডকে populate করার সময় ফ্রন্টএন্ড/কন্ট্রোলার লেভেলে ম্যাচ করতে পারি,
  // অথবা এখানে 'user' এর অবজেক্ট ফিল্টারিং অবজেক্ট রিটার্ন করতে পারি।

  return this.find(query).populate({
    path: "user",
    select: "name phone email", // ইউজার মডেল থেকে যা যা ডাটা চান
  });
};

const CommitteeMember = mongoose.model(
  "CommitteeMember",
  committeeMemberSchema,
);
module.exports = CommitteeMember;





const CommitteeMember = require("./committee.model");

const searchCommittee = async (req, res) => {
  try {
    // URL Query থেকে প্যারামিটারগুলো নেওয়া হচ্ছে (e.g., /api/search?union=Jagatpur&name=Karim)
    const { name, phone, union, ward, village } = req.query;

    // মডেলের কাস্টম সার্চ মেথড কল করা হচ্ছে (এটি ইউনিয়ন, ওয়ার্ড, গ্রাম ফিল্টার করবে)
    let members = await CommitteeMember.searchMembers({ union, ward, village });

    // 🔍 নাম (Name) অথবা ফোন (Phone) দিয়ে ফিল্টার করার লজিক (যেহেতু এগুলো ref: 'User' এর ভেতরে আছে)
    if (name || phone) {
      members = members.filter((member) => {
        if (!member.user) return false; // যদি কোনো কারণে ইউজার ডাটা ডিলিট হয়ে থাকে

        let matchName = true;
        let matchPhone = true;

        if (name) {
          matchName = member.user.name
            .toLowerCase()
            .includes(name.toLowerCase());
        }
        if (phone) {
          matchPhone = member.user.phone.includes(phone);
        }

        return matchName && matchPhone;
      });
    }

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { searchCommittee };

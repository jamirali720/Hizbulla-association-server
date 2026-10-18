const jwt = require("jsonwebtoken")
import fs from "fs";
const userRoles = [অ্যাডমিন, ইউজার, মুরিদ, মুহিব্বীন];

const userPosts = [
  "সভাপতি",
  "সহ-সভাপতি",
  "সাধারণ সম্পাদক",
  "যুগ্ম-সাধারণ সম্পদক",
  "সহ-সাধারণ_সম্পদক",
  "তা’লিমে তরীকত সম্পাদক",
  "সহ-তা’লিমে তরীকত সম্পাদক",
  "সাংগঠনিক সম্পদক",
  "সহকারী সাংগঠনিক সম্পাদক",
  "প্রচার সম্পাদক",
  "সহকারী প্রচার সম্পদক",
  "শিক্ষা ও সাংস্কৃতিক সম্পাদক",
  "সহ-শিক্ষা ও সাংস্কৃতিক সম্পাদক",
  "সেবা ও সমাজ কল্যাণ সম্পাদক",
  "সহ-সেবা ও সমাজ কল্যাণ সম্পদক",
  "অর্থ সম্পাদক",
  "সহকারী অর্থ সম্পাদক",
  "অডিটর",
  "দপ্তর সম্পাদক",
  "সহকারী দপ্তর সম্পদক",
  "সদস্য",
];

const unionNames = [
  "সাতানী",
  "জগতপুর",
  "বলরামপুর",
  "কড়িকান্দি",
  "কলাকান্দি",
  "ভিটিকান্দি",
  "নারান্দিয়া",
  "জিয়ারকান্দি",
  "মজিদপুর",
];

const wardNumbers = [
  "এক",
  "দুই",
  "তিন",
  "চার",
  "পাঁচ",
  "ছয়",
  "সাত",
  "আট",
  "নয়",
];





const createAccessToken = (payload, secretKey, expiresIn) => {
  const tokenObject = {
    userId: payload._id,   
    role: payload.role,
  };
   return jwt.sign(tokenObject, secretKey, { expiresIn });
};








const deleteImagePath = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Image deleted successfully");
  });
};

module.exports = {
  userRoles,
  userPosts,
  unionNames,
  wardNumbers,
  createAccessToken,
  deleteImagePath,
};
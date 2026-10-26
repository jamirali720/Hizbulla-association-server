import jwt from "jsonwebtoken";
import fs from "fs";
import { User } from "../model/user.model.js";


export const userRoles = ["অ্যাডমিন", "ইউজার"];


export const committeePosts = [
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

export const unionNames = [
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

export const wardNumbers = [
  "ওয়ার্ড-এক",
  "ওয়ার্ড-দুই",
  "ওয়ার্ড-তিন",
  "ওয়ার্ড-চার",
  "ওয়ার্ড-পাঁচ",
  "ওয়ার্ড-ছয়",
  "ওয়ার্ড-সাত",
  "ওয়ার্ড-আট",
  "ওয়ার্ড-নয়",
];

export const createAccessToken = (payload, secretKey, expiresIn) => {
  const tokenObject = {
    userId: payload._id,
    role: payload.role,
  };
  return jwt.sign(tokenObject, secretKey, { expiresIn });
};

export const deleteImagePath = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Image deleted successfully");
  });
};

export const generateUserId = async () => {
  const lastUser = await User.findOne().sort({userId: -1}).exec();
  const lastId =lastUser ? parseInt(lastUser.userId) : 0;
  const newId = (lastId + 1).toString().padStart(7, "0") ;
  return newId;
};


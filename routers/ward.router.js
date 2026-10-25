import express from 'express';
import WardCommittee from '../model/wardCommittee.model.js';
const wardRouter = express.Router();


wardRouter.get("/", async (req, res) => {
  try {
    const data = await WardCommittee.find()
      .populate({
        path: "union",
        populate: { path: "upazila" },
      })
      .sort({ wardNumber: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

wardRouter.post("/", async (req, res) => {
  try {
    const ward = new WardCommittee(req.body);
    const saved = await ward.save();
    const populated = await WardCommittee.findById(saved._id).populate({
      path: "union",
      populate: { path: "upazila" },
    });
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

wardRouter.put("/:id", async (req, res) => {
  try {
    const updated = await WardCommittee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate({
      path: "union",
      populate: { path: "upazila" },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

wardRouter.delete("/:id", async (req, res) => {
  try {
    await WardCommittee.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default  wardRouter;

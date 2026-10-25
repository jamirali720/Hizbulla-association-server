import express from 'express';
import Union from '../model/union.model.js';
const unionRouter = express.Router();


unionRouter.get("/", async (req, res) => {
  try {
    const data = await Union.find().populate("upazila").sort({ name: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

unionRouter.post("/", async (req, res) => {
  try {
    const union = new Union(req.body);
    const saved = await union.save();
    const populated = await Union.findById(saved._id).populate("upazila");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

unionRouter.put("/:id", async (req, res) => {
  try {
    const updated = await Union.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("upazila");
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

unionRouter.delete("/:id", async (req, res) => {
  try {
    await Union.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default  unionRouter;

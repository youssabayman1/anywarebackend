const mongoose = require("mongoose");

// 1. Define Schema
const announcementSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// 2. Create Model
const Announcement = mongoose.model("Announcement", announcementSchema);

// 3. Export the model
module.exports = Announcement;

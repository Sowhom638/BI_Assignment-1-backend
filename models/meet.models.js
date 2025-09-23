const mongoose = require("mongoose");

const meetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      enum: [
        "Workshop",
        "Lecture",
        "Hackathon",
        "Tech Talk",
        "Creative Writing",
        "Photography",
        "Video Editing",
        "Art Jam",
        "Yoga",
        "Meditation",
        "Life Coaching",
        "Trivia",
        "Outdoor Adventure",
        "Volunteering",
        "Community Cleanup",
      ],
      required: true,
    },
    started: {
      type: String,
      required: true,
    },
    ended: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      enum: ['Online', 'Offline', 'Both'],
      required: true
    },
    price: {
      type: String,
      required: true,
    },
    speakers: {
      type: [String],
      required: true,
    },
    dressCode: {
      type: String,
      default: "None"
    },
    ageRestrictions: {
      type: String,
      default: "No age restriction"
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Meet = mongoose.model("Meet", meetSchema);
module.exports = Meet;

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  dateofbirth: {
    type: Date,
  },
  school: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  hobbies: {
    type: [String],
  },
  desiredperweek: {
    type: Number,
    required: true,
  },
  scheduledthisweek: {
    type: Number,
  },
  listofpeoplemet: {
    type: [String],
  },
  bio: {
    type: String,
  },
  social: {
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);

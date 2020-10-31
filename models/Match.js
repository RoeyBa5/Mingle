const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  profile1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  profile2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Match = mongoose.model("match", MatchSchema);

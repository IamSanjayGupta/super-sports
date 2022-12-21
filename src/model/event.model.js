// Schema for Event

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String },
    schedule: { type: Date, required: true },
    player_limits: { type: Number, required: true, default: 2 },
    category: {
      type: String,
      enums: ["Cricket", "Football", "Badminton", "Tennis", "Basketball", "Golf", "Hockey"],
      required: true,
    },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

eventSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;

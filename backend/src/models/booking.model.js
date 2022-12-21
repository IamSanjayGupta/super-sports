// Schema for Event Bookings

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "event", required: true },
    status: {
      type: String,
      enums: ["Pending", "Approved", "Rejected", "Expired", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

bookingSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;

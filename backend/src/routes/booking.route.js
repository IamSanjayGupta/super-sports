const express = require("express");
const {
  getBookings,
  createBooking,
  updateBooking,
  approveBooking,
  rejectBooking,
} = require("../controllers");
const { authMiddleware } = require("../middlewares");

const booking = express.Router();
booking.use(authMiddleware);

booking.get("/", async (req, res) => {
  const { userid, ...others } = req.body;
  try {
    let bookings = await getBookings({ requester: userid, ...others });
    return res.send({
      message: bookings.length ? "Bookings found" : "No bookings found",
      data: bookings,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

booking.post("/", async (req, res) => {
  const { userid, event } = req.body;
  if (!userid || !event) return res.status(400).send({ message: "Required Data missing" });

  try {
    let book = await createBooking({ requester: userid, event });
    return res.send({ message: "Booking Created", data: book });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

booking.patch("/:eventid", async (req, res) => {
  const { userid, status } = req.body;
  const { eventid } = req.body;

  if (!userid || !eventid || !status)
    return res.status(400).send({ message: "Required Data missing" });

  try {
    let book;
    if (status === "Approve") {
      book = await approveBooking({ requester: userid, event: eventid, status: "Approved" });
    } else if (status === "Reject") {
      book = await rejectBooking({ requester: userid, event: eventid, status: "Rejected" });
    }
    return res.send({ message: "Booking updated", data: book });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

booking.get("/:id", async (req, res) => {});

module.exports = booking;
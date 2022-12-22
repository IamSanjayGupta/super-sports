const express = require("express");
const {
  getBookings,
  createBooking,
  getApprovedBookingUsers,
  pendingBookings,
  updateBooking,
} = require("../controllers");
const { authMiddleware } = require("../middlewares");

const booking = express.Router();
booking.use(authMiddleware);

//get user's bookings
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

//get bookings pending for user approval
booking.get("/pendingBookings", async (req, res) => {
  const { userid } = req.body;
  try {
    let bookings = await pendingBookings(userid);
    return res.send({ message: "Pending Booking", data: bookings });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//get all approved user list of an event if you user itself apporved.
booking.get("/:eventid", async (req, res) => {
  const { userid } = req.body;
  const { eventid } = req.params;
  try {
    let players = await getApprovedBookingUsers({ requester: userid, eventid });
    return res.send({ message: players.length ? "Approved Players" : "No player", data: players });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//create booking
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

//update(approve/reject) booking
booking.patch("/:bookingId", async (req, res) => {
  const { status } = req.body;
  const { bookingId } = req.params;

  if (!bookingId || !status) return res.status(400).send({ message: "Required Data missing" });

  try {
    let book = await updateBooking(bookingId, {
      status: status === "Approve" ? "Approved" : "Rejected",
    });
    return res.send({ message: "Booking updated", data: book });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

module.exports = booking;

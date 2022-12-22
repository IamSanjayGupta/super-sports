const { getTokens, getAccessToken, getRefreshToken } = require("./jwt.controller");
const { createAccount, getUser } = require("./user.controller");
const { createEvent, getAllEvents } = require("./event.controller");
const {
  getBookings,
  createBooking,
  updateBooking,
  approveBooking,
  rejectBooking,
  getApprovedBookingUsers,
} = require("./booking.controller");

module.exports = {
  getTokens,
  getAccessToken,
  getRefreshToken,
  createAccount,
  getUser,
  createEvent,
  getAllEvents,
  getBookings,
  createBooking,
  updateBooking,
  approveBooking,
  rejectBooking,
  getApprovedBookingUsers,
};

const { bookingModel, eventModel } = require("../models");

const getBookings = async (others) => {
  try {
    return await bookingModel
      .find({ ...others }, { updatedAt: 0, createdAt: 0, __v: 0 })
      .populate("event")
      .populate("requester", ["firstName", "lastName", "email"])
      .collation({ locale: "en", strength: 2 });
  } catch (error) {
    throw new Error(error);
  }
};

//get all approved user list of an event if user itself apporved.
const getApprovedBookingUsers = async ({ requester, eventid }) => {
  try {
    let approvedBooking = await getBookings({ event: eventid, status: "Approved" });
    approvedBooking = approvedBooking.map((booking) => {
      return { ...booking.toObject().requester };
    });

    let temp = approvedBooking.find((req) => req._id == requester);
    if (temp?._id) return approvedBooking;
    return [];
  } catch (error) {
    throw new Error(error);
  }
};

//create new booking
const createBooking = async ({ requester, event }) => {
  try {
    let checkBook = await getBookings({ requester, event });
    if (checkBook.length) {
      throw new Error("Already Requested: Current Status " + checkBook[0].status);
    } else {
      let eventLimit = await eventModel.findById(event, { player_limits: 1, _id: 0 });
      let totalApprovedBookings = await bookingModel.find({ event, status: "Approved" }).count();

      if (totalApprovedBookings >= eventLimit) {
        throw new Error("No seat available");
      } else {
        return await bookingModel.create({ requester, event });
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

//get bookings pending for user approval
const pendingBookings = async (organizer) => {
  try {
    let bookings = await bookingModel
      .find({ status: "Pending" })
      .populate("event")
      // .find({ "event.organizer": organizer })
      .populate("requester", ["firstName", "lastName", "email"]);

    bookings = bookings.filter((el) => {
      let obj = el.toObject();
      return obj.event.organizer == organizer;
    });
    return bookings;
  } catch (error) {
    throw new Error(error);
  }
};

//accept or reject booking
const updateBooking = async (id, data) => {
  console.log(data);
  try {
    return await bookingModel.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createBooking,
  getBookings,
  getApprovedBookingUsers,
  updateBooking,
  pendingBookings,
};

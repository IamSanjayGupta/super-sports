const { bookingModel, eventModel } = require("../models");
const { getEventDetails } = require("./event.controller");

const getBookings = async (others) => {
  try {
    return await bookingModel
      .find({ ...others }, { updatedAt: 0, createdAt: 0, __v: 0 })
      .collation({ locale: "en", strength: 2 });
  } catch (error) {
    throw new Error(error);
  }
};

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

const updateBooking = async (event) => {
  try {
    return await bookingModel.findOneAndUpdate({ event }, {}, { new: true, upsert: true });
  } catch (error) {
    throw new Error(error);
  }
};

const approveBooking = async (event) => {
  try {
    return await bookingModel.findById();
  } catch (error) {
    throw new Error(error);
  }
};

const rejectBooking = async (event) => {
  try {
    return await bookingModel.findOneAndUpdate({ event }, {}, { new: true, upsert: true });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createBooking, getBookings, updateBooking, approveBooking, rejectBooking };

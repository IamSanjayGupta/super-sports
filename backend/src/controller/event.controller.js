const { eventModel } = require("../model");

const createEvent = async (eventData) => {
  try {
    return await eventModel.create(eventData);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllEvents = async (query, others) => {
  try {
    return await eventModel
      .aggregate([
        { $match: { $and: [{ title: { $regex: query, $options: "i" } }, { ...others }] } },
        { $unset: ["updatedAt", "createdAt", "__v"] },
      ])
      .collation({ locale: "en", strength: 2 });
  } catch (error) {
    throw new Error(error);
  }
};

//get event by id
const getEventDetails = async (eventId) => {
  try {
    return await eventModel
      .findById(eventId)
      .populate("organizer", ["firstName", "lastName", "email"]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createEvent, getAllEvents, getEventDetails };

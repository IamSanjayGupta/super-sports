const { eventModel } = require("../model");

const createEvent = async (eventData) => {
  try {
    return await eventModel.create(eventData);
  } catch (error) {
    throw new Error(error);
  }
};

const getAllEvents = async () => {
  try {
    return await eventModel.find({});
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createEvent, getAllEvents };

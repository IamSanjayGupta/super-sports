const { bookingModel } = require("../models");

const getEvents = async () => {
  try {
    return await bookingModel
      .aggregate([{ $match: { ...others } }, { $unset: ["updatedAt", "createdAt", "__v"] }])
      .collation({ locale: "en", strength: 2 });
  } catch (error) {
    throw new Error(error);
  }
};

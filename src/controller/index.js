const { getTokens, getAccessToken, getRefreshToken } = require("./jwt.controller");
const { createAccount, getUser } = require("./user.controller");
const { createEvent, getAllEvents } = require("./event.controller");

module.exports = {
  getTokens,
  getAccessToken,
  getRefreshToken,
  createAccount,
  getUser,
  createEvent,
  getAllEvents,
};

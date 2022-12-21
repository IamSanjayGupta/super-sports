const { getTokens, getAccessToken, getRefreshToken } = require("./jwt.controller");
const { createAccount, getUser } = require("./user.controller");

module.exports = {
  getTokens,
  getAccessToken,
  getRefreshToken,
  createAccount,
  getUser,
};

const userModel = require("../models/user.model");

//pass user data object to create account
const createAccount = async (userData) => {
  try {
    let user = await userModel.create(userData);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// pass key value pair to check in database
const getUser = async (data) => {
  try {
    let user = await userModel.findOne(data, { password: 0, updatedAt: 0, __v: 0 });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createAccount, getUser };

const express = require("express");
const { getUser, createAccount, getAccessToken, getTokens } = require("../controller");

const user = express.Router();

user.post("/signup", async (req, res) => {
  const { firstName, lastName = "", email, password } = req.body;
  if (!firstName || !email || !password)
    return res.status(400).send({ message: "Required Data missing" });
  try {
    let user = await getUser({ email });
    if (user) {
      return res.status(409).send({ message: "Account already exist" });
    } else {
      user = await createAccount({ firstName, lastName, email, password });
      return res.send({ message: "Account Created", data: user });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

user.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: "Required Data missing" });

  try {
    let user = await getUser({ email, password });
    if (user) {
      let { accessToken, refreshToken } = getTokens({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userid: user._id,
      });

      return res.send({ message: "Login successfull", data: { accessToken, refreshToken } });
    } else {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

module.exports = user;

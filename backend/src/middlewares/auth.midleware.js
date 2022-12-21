const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let accessToken = req.headers["x-access-token"];
  if (accessToken) {
    try {
      let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
      req.body.userid = user.userid;
      next();
    } catch (error) {
      return res.status(498).send({ message: error.message });
    }
  } else {
    return res.status(499).send({ message: "Missing token" });
  }
};

module.exports = authMiddleware;

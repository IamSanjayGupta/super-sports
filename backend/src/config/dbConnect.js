const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = async () => {
  await mongoose.connect(process.env.DB_URL);
};

module.exports = { dbConnect };

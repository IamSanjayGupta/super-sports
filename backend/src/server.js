const express = require("express");
const { dbConnect } = require("./config");
const { userRouter, eventRouter, bookingRouter } = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use("/booking", bookingRouter);

app.get("/", (req, res) => res.send("Hello world. Welcome to word super sports api."));

app.listen(process.env.PORT, async () => {
  try {
    await dbConnect();
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.log("Unable to connect to database");
  }
});

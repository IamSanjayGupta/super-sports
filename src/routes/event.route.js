const express = require("express");
const { createEvent } = require("../controller");
const { authMiddleware } = require("../middlewares");

const event = express.Router();
event.use(authMiddleware);

event.get("/", async (req, res) => {});

// to create new Event
event.post("/", async (req, res) => {
  const { title, description, picture = "", category, schedule, player_limits, userid } = req.body;

  if (!title || !description || !schedule || !player_limits)
    return res.status(400).send({ message: "Required Data missing" });

  try {
    let newEvent = await createEvent({
      title,
      description,
      picture,
      schedule,
      category,
      player_limits,
      organizer: userid,
    });
    return res.send({ message: "New Event Created", data: newEvent });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

module.exports = event;

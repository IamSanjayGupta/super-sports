const express = require("express");
const { createEvent, getAllEvents } = require("../controllers");
const { getEventDetails } = require("../controllers/event.controller");
const { authMiddleware } = require("../middlewares");

const event = express.Router();
event.use(authMiddleware);

//get all events
event.get("/", async (req, res) => {
  const { q = "", ...others } = req.query;
  try {
    let events = await getAllEvents(q, others);
    return res.send({ message: events.length ? "Events found" : "No events found", data: events });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//get one event
event.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let event = await getEventDetails(id);
    return res.send({ message: "Events found", data: event });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

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

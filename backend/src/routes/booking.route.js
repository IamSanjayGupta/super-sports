const express = require("express");
const booking = express.Router();

booking.get("/", async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

booking.get("/:id", async (req, res) => {});

booking.get("/:id", async (req, res) => {});

module.exports = booking;

import Event from "../models/event.js";
import mongoose from "mongoose";

export const createEvent = async (req, res) => {
  const {
    name,
    startTimeUnixTimestamp,
    endTimeUnixTimestamp,
    address,
    description,
    organizationId,
  } = req.body.data;

  console.log(req.body);

  try {
    const event = await Event.create({
      name,
      startTimeUnixTimestamp,
      endTimeUnixTimestamp,
      address,
      description,
      organizationId,
    });

    console.log(event);

    return res.json({
      message: "Event created successfully!",
      error: false,
      data: { event: event },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "error creating event",
      error: true,
    });
  }
};
export const updateEvent = async (req, res) => {
  const id = req.params.eventId;

  const {
    name,
    startTimeUnixTimestamp,
    endTimeUnixTimestamp,
    address,
    description,
    organizationId,
  } = req.body.data;

  console.log("WITHIN BACKEND UPDATE EVENT");
  console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No event matches ID" });
  }

  const updatedEvent = await Event.findOneAndUpdate(
    { _id: id },
    {
      name,
      startTimeUnixTimestamp,
      endTimeUnixTimestamp,
      address,
      description,
      organizationId,
    },
    { new: true }
  );

  return res.json({
    message: "Event updated successfully!",
    error: false,
    data: { event: updatedEvent },
  });
};

export const deleteEvent = async (req, res) => {
  console.log(req.params);
  console.log("DELTE EVEN TFIRED");
  const id = req.params.eventId;

  const event = await Event.findOne({ _id: id });

  console.log(event);

  if (!event) {
    return res.json({
      message: "No event with id exists.",
      error: true,
    });
  }

  try {
    await Event.findByIdAndRemove(id);
    return res.json({
      message: "Event has been deleted.",
      error: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEvents = async (req, res) => {
  const { organizationId, period } = req.params;
  console.log(period);

  try {
    let events;
    //get all events
    if (period === "all") {
      events = await Event.find({ organizationId });
    }
    //get upcoming events
    if (period === "future") {
      events = await Event.find({
        organizationId,
        endTimeUnixTimestamp: { $gte: 1661268723 },
      });
    }
    //get past events

    if (period === "past") {
      events = await Event.find({
        organizationId,
        endTimeUnixTimestamp: { $lt: 1661268723 },
      });
    }
    if (events.length === 0) {
      return res.json({
        message: "No events exist for organizationId",
        error: false,
      });
    }

    const secondsSinceEpoch = Math.round(Date.now() / 1000);

    events.sort((a, b) => {
      return a.startTimeUnixTimestamp - b.startTimeUnixTimestamp;
    });

    return res.json({
      message: "success",
      error: false,
      data: { events: events },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "error fetching events",
      error: true,
    });
  }
};

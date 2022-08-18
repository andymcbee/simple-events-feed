import Event from "../models/event.js";
import mongoose from "mongoose";

export const createEvent = async (req, res) => {
  const {
    name,
    startTimeUnixTimestamp,
    timeZone,
    duration,
    address,
    description,
    organizationId,
  } = req.body;

  try {
    const event = await Event.create({
      name,
      startTimeUnixTimestamp,
      timeZone,
      duration,
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
    timeZone,
    duration,
    address,
    description,
    organizationId,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No event matches ID" });
  }

  const updatedEvent = await Event.findOneAndUpdate(
    { _id: id },
    {
      name,
      startTimeUnixTimestamp,
      timeZone,
      duration,
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
  const { organizationId } = req.params;

  try {
    const events = await Event.find({ organizationId });

    if (events.length === 0) {
      return res.json({
        message: "No events exist for organizationId",
        error: false,
      });
    }
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

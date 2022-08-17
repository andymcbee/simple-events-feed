import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTimeUnixTimestamp: { type: String, required: true },
  timeZone: { type: String, required: true },
  duration: { type: Number, required: true },
  address: { type: String, required: true },
  descriptions: { type: String, required: true },
  organizationId: { type: String, required: true },
  id: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Event = mongoose.model("Event", EventsSchema);

export default Event;

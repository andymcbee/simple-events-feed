import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  startTimeUnixTimestamp: { type: String, required: true, unique: true },
  timeZone: { type: String, required: true, unique: true },
  duration: { type: Number, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  descriptions: { type: String, required: true, unique: true },
  organizationId: { type: String, required: true, unique: true },
  id: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Event = mongoose.model("Event", EventsSchema);

export default Event;

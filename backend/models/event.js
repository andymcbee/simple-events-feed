import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTimeUnixTimestamp: { type: String, required: true },
  endTimeUnixTimestamp: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  organizationId: { type: String, required: true },
  id: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Event = mongoose.model("Event", EventsSchema);

export default Event;

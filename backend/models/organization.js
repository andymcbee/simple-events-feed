import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subDomain: { type: String, required: true, unique: true },
  id: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;

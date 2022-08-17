import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import usersRoute from "./routes/usersRoute.js";
import eventsRoute from "./routes/eventsRoute.js";
import organizationsRoute from "./routes/organizationsRoute.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/organizations", organizationsRoute);
app.use("/api/v1/events", eventsRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}.`);
    })
  )
  .catch((err) => console.log(err));

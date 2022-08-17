import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
} from "../controllers/event.js";

const router = express.Router();

router.post("/create/:eventId", createEvent);
router.post("/update/:eventId", updateEvent);
router.post("/delete/:eventId", deleteEvent);
router.get("/", getEvents);

export default router;

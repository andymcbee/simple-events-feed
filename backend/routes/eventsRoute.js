import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
} from "../controllers/event.js";

const router = express.Router();

router.post("/create", createEvent);
router.post("/update/:eventId", updateEvent);
router.post("/delete/:eventId", deleteEvent);
router.get("/:organizationId/:period", getEvents); //period can equal: all, past or future

export default router;

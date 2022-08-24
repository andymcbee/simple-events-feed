import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
} from "../controllers/event.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/create", auth, createEvent);
router.post("/update/:eventId", auth, updateEvent);
router.post("/delete/:eventId", auth, deleteEvent);
router.get("/:organizationId/:period", getEvents); //period can equal: all, past or future

export default router;

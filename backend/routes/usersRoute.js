import express from "express";
import {
  signup,
  signin,
  resetPassword,
  setNewPassword,
  getUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/reset-password", resetPassword);
router.post("/set-password", setNewPassword);
router.get("/:userId", getUser);

export default router;

import express from "express";
import { getOrganization } from "../controllers/organization.js";

const router = express.Router();

router.get("/:organizationId", getOrganization);

export default router;

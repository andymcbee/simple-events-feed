import express from "express";
import {
  getOrganizationById,
  getOrganizationBySubDomain,
} from "../controllers/organization.js";

const router = express.Router();

router.get("/org-id/:organizationId", getOrganizationById);
router.get("/sub-domain/:subDomain", getOrganizationBySubDomain);

export default router;

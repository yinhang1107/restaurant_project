import express from "express";

import {
  getTypes,
  getType,
  createType,
  updateType,
  deleteType,
} from "../controllers/types.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", getTypes);
router.get("/:id", validateObjectId, getType);
router.post("/", [auth, admin], createType);
router.put("/:id", [auth, validateObjectId], updateType);
router.delete("/:id", [auth, admin, validateObjectId], deleteType);

export default router;

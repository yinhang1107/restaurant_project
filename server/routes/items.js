import express from "express";

import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/items.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", validateObjectId, getItem);
router.post("/", [auth, admin], createItem);
router.put("/:id", [auth, validateObjectId], updateItem);
router.delete("/:id", [auth, admin, validateObjectId], deleteItem);

export default router;

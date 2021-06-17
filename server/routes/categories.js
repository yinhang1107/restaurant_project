import express from "express";

import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", validateObjectId, getCategory);
router.post("/", [auth,admin], createCategory);
router.put("/:id", [validateObjectId, auth], updateCategory);
router.delete("/:id", [auth, admin], deleteCategory);

export default router;

import express from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id",validateObjectId, getPost);
router.post("/",[auth,admin], createPost);
router.put("/:id",[validateObjectId, auth], updatePost);
router.delete("/:id",[validateObjectId,auth, admin], deletePost);

export default router;

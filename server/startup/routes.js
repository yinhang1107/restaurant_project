import express from "express";
import cors from "cors";
import "express-async-errors";


import categories from "../routes/categories.js";
import items from "../routes/items.js";
import types from "../routes/types.js";
import auth from "../routes/auth.js";
import users from "../routes/users.js";
import posts from "../routes/posts.js";
import error from "../middleware/error.js";

export default function (app) {
  app.use(express.json({ limit: "30mb", extended: true }));
  app.use(cors());
  app.use("/api/categories", categories);
  app.use("/api/types", types);
  app.use("/api/menu", items);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/news", posts);
  app.use(error);
}

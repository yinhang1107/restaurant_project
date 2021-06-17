import express from "express";

import register from "../controllers/users.js";

const router = express.Router();

router.post("/", register);

export default router;

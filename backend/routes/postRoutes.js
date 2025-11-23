import express from "express";
import { storePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/save-post", storePost);

export default router;
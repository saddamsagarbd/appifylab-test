import express from "express";
import { storePost, getPosts, toggleLike } from "../controllers/postController.js";

const router = express.Router();

router.post("/save-post", storePost);
router.get("/get-posts", getPosts);
router.post("/toggle-like", toggleLike);

export default router;
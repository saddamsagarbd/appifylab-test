import express from "express";
import { storePost, getPosts, toggleLike, postComment, commentReply } from "../controllers/postController.js";

const router = express.Router();

router.post("/save-post", storePost);
router.get("/get-posts", getPosts);
router.post("/toggle-like", toggleLike);
router.post("/comment", postComment);
router.post("/reply", commentReply);

export default router;
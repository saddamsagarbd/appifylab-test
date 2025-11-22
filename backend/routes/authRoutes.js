import express from "express";
import { userRegistration, login } from "../controllers/authController.js";

const router = express.Router();
router.post("/registration", userRegistration);
router.post("/login", login);

export default router;

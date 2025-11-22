import express from "express";
import { getPlans, getPlanById, storePlan, updatePlan, deletePlan } from "../controllers/planController.js";

const router = express.Router();

router.get("/getPlans", getPlans);
router.get("/getPlanById/:id", getPlanById);
router.post("/save-plan", storePlan);
router.post("/update/:id", updatePlan);
router.delete("/delete/:id", deletePlan);

export default router;
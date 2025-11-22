import express from "express";
import { getCompnies, getCompanyById, storeCompany, updateCompany, deleteCompany } from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getCompnies);
router.get("/getCompanyById/:id", getCompanyById);
router.post("/save-company", storeCompany);
router.post("/update/:id", updateCompany);
router.delete("/delete/:id", deleteCompany);

export default router;
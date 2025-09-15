import express from "express";
import {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} from "../controllers/careerController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllCareers);
router.get("/:id", getCareerById); // optional
router.post("/", authenticate, createCareer);
router.put("/:id", authenticate, updateCareer);
router.delete("/:id", authenticate, deleteCareer);

export default router;

import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/add", verifyUser, addLeave);
router.put("/:id", verifyUser, updateLeave);
router.get("/:id", verifyUser, getLeave);
router.get("/", verifyUser, getLeaves);
router.get("/detail/:id", verifyUser, getLeaveDetail);

export default router;

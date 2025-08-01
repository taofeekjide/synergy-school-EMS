import express from "express";
import {
  getPublicEmployees,
  getPublicLeaves,
} from "../controllers/publicController.js";

const router = express.Router();

router.get("/employees", getPublicEmployees);
router.get("/leaves", getPublicLeaves);

export default router;

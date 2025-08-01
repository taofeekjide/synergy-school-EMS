import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  editEmployee,
  // getDepartments,
  // editDepartment,
  // getDepartment,
  // deleteDepartment,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/add", verifyUser, upload.single("image"), addEmployee);
router.get("/", verifyUser, getEmployees);
router.get("/:id", verifyUser, getEmployee);
router.put("/:id", verifyUser, editEmployee);
// router.delete("/:id", verifyUser, deleteDepartment);

export default router;

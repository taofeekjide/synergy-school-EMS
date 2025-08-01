import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

// GET /api/public/employees
export async function getPublicEmployees(req, res) {
  try {
    const employees = await Employee.find()
      .populate("userId", "name email")
      .populate("department", "dep_name")
      .select("userId department designation startDate");

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get public employees server error",
    });
  }
}

// GET /api/public/leaves
export async function getPublicLeaves(req, res) {
  try {
    const leaves = await Leave.find()
      .populate({
        path: "employeeId",
        populate: [
          { path: "userId", select: "name" },
          { path: "department", select: "dep_name" },
        ],
      })
      .select("employeeId leaveType startDate endDate status");

    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get public leaves server error",
    });
  }
}

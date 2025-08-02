import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import Department from "../models/Department.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });

export async function addEmployee(req, res) {
  try {
    const {
      name,
      email,
      employeeId,
      startDate,
      designation,
      salary,
      department,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: true,
        error: "User already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      startDate,
      designation,
      salary,
      department,
    });

    await newEmployee.save();

    return res.status(200).json({
      success: true,
      message: "New employee created",
    });
  } catch (error) {
    console.error("Employee creation failed:", error);
    return res.status(500).json({
      success: false,
      error: "Server error in creating new employee",
    });
  }
}

export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get employees server error",
    });
  }
}

export async function getEmployee(req, res) {
  const { id } = req.params;

  try {
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department salary");
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department salary");
    }
    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get employee server error",
    });
  }
}

export async function editEmployee(req, res) {
  try {
    const { id } = req.params;
    const { name, startDate, designation, salary, department } = req.body;

    const employee = await Employee.findById({ _id: id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    const user = await User.findById({ _id: employee.userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      { startDate, designation, salary, department }
    );

    if (!updateUser || !updateEmployee) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee Edited",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Edit employee server error",
    });
  }
}

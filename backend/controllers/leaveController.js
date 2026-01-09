import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import nodemailer from "nodemailer";

export async function addLeave(req, res) {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Leave add server error",
    });
  }
}

export async function getLeave(req, res) {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ userId: id });

    const leaves = await Leave.find({ employeeId: employee._id });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get leave server error",
    });
  }
}

export async function getLeaves(req, res) {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get leaves server error",
    });
  }
}

export async function getLeaveDetail(req, res) {
  try {
    const { id } = req.params;

    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name, profileImage",
        },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Get leaves server error",
    });
  }
}

export async function updateLeave(req, res) {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );
    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not found",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Update leave server error",
    });
  }
}

// export async function updateLeave(req, res) {
//   try {
//     const { id } = req.params;

//     const leave = await Leave.findByIdAndUpdate(
//       id,
//       { status: req.body.status, updatedAt: Date.now() },
//       { new: true }
//     ).populate({
//       path: "employeeId",
//       populate: { path: "userId", model: "User" },
//     });

//     if (!leave) {
//       return res.status(404).json({
//         success: false,
//         error: "Leave not found",
//       });
//     }

//     const employee = leave.employeeId;
//     const user = employee?.userId;
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         error: "Employee user not found",
//       });
//     }

//     const employeeEmail = user.email;
//     const employeeName = user.name;

//     // Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: employeeEmail,
//       subject: "Leave Request Update",
//       text: `Hello ${employeeName},

// Your leave request (${leave.leaveType}) from ${leave.startDate.toDateString()} 
// to ${leave.endDate.toDateString()} has been ${leave.status}.

// Reason provided: ${leave.reason}

// Best regards,
// Admin Department`,
//     };

//     // Send mail
//     await transporter.sendMail(mailOptions);

//     return res
//       .status(200)
//       .json({
//         success: true,
//         message: "Leave status updated and email notification sent!",
//       });
//   } catch (error) {
//     console.error("Error updating leave:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Update leave server error",
//     });
//   }
// }

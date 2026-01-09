import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database/db.js";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import leaveRouter from "./routes/leave.js";
import publicRoute from "./routes/publicRoute.js";
import dashboardRouter from "./routes/dashboard.js";
import nodemailer from "nodemailer";

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/leaves", leaveRouter);
app.use("/uploads", express.static("public/uploads"));
app.use("/api/public", publicRoute);
app.use("/api/dashboard", dashboardRouter);

// app.post("/send-email", (req, res) => {
//   const { userId, userEmail, userName, leaveType, startDate, endDate, reason } =
//     req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

//   // Setup email content
//   const mailOptions = {
//     from: `"${userName}" <${process.env.EMAIL}>`,
//     replyTo: userEmail,
//     to: process.env.EMAIL,
//     subject: "New Leave Request Submitted",
//     text: `A new leave request has been submitted:

//           Employee ID: ${userId}
//           Employee Email: ${userEmail}
//           Employee Name: ${userName}
//           Leave Type: ${leaveType}
//           Start Date: ${startDate}
//           End Date: ${endDate}
//           Reason: ${reason}`,
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       return res
//         .status(500)
//         .json({ success: false, error: "Failed to send email" });
//     }
//     console.log("Email sent:", info.response);
//     return res
//       .status(200)
//       .json({ success: true, message: "Email sent successfully" });
//   });
// });

// app.post("/send-response-email", (req, res) => {
//   const { userEmail, userName, leaveType, startDate, endDate, status } =
//     req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: `"HR Department" <${process.env.EMAIL}>`,
//     to: userEmail,
//     subject: `Your Leave Request (${leaveType}) has been ${status}`,
//     text: `Hello ${userName},

//           Your leave request has been reviewed.

//           Leave Type: ${leaveType}
//           From: ${startDate}
//           To: ${endDate}
//           Status: ${status}

//           Thank you,
//           Admin Department`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending response email:", error.message);
//       return res.status(500).json({ success: false, error: error.message });
//     }
//     console.log("Response email sent:", info.response);
//     return res
//       .status(200)
//       .json({ success: true, message: "Response email sent successfully" });
//   });
// });

//db connection
connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

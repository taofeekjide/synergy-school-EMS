# Synergy School Employee Management System

A modern web-based application designed to help schools efficiently manage employee data, departments, leave requests, and internal operations. Built with React and Tailwind CSS, this system provides role-based dashboards and a secure, intuitive interface for both administrators and employees.

## Live Demo

[View Live Application](https://synergy-school-ems-1.onrender.com/)  
[PDF Presentation](http://eu.docworkspace.com/d/slAKo8vu9AueSycQG?sa=601.1074)

## Features

- Secure Authentication with JWT
- Role-Based Dashboards (Admin & Employee)
- Department Management
- Employee CRUD Operations
- Leave Request System (Apply, Approve, Reject)
- Unit Testing with Jest
- Public Demo Mode (view demo employee records)
- Protected Routes via Context API
- Admin Analytics Summary Cards

## Roles & Access

**Admin**
- Add & manage departments and employees
- View & manage all leave requests
- Access dashboard analytics

**Employee**
- View personal profile & department info
- Apply for leave

**Public**
- Access demo account to test features (view only)

## Authentication

- JWT-based login system  
- Only admins can add employees — no public signup  
- Demo employee credentials available for public viewing

## Tech Stack

**Frontend:**
- React
- Tailwind CSS
- React Router
- Context API
- Axios
- Jest

**Backend:**
- Nodejs
- Expressjs
- MongoDB

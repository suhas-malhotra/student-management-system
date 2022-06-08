const express = require("express");
const authAPI = require("../../controllers/auth/authenticationApi");
const router = express.Router();

//Authentication API

// API 
// Authentication for admin login
//API Working
router.post("/admin/login", authAPI.Adminlogin);

// API 
// Authentication for student login
//API Working
router.post("/student/login", authAPI.Studentlogin);

// API 
// Authentication for teacher login
//API Working
router.post("/teacher/login", authAPI.Teacherlogin);

module.exports = router;

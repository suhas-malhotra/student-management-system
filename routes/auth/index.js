const express = require("express");
const authAPI = require("../../controllers/auth/authenticationApi");
const router = express.Router();

//Authentication API
router.post("/admin/login", authAPI.Adminlogin);
router.post("/student/login", authAPI.Studentlogin);
router.post("/teacher/login", authAPI.Teacherlogin);

module.exports = router;

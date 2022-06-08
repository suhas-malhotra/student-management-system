const express = require("express");
const studentAPI = require("../../controllers/student/studentApi");
const { verifyTokenStudent } = require("../../middleware/verifyToken");
const router = express.Router();

// API 
// Report Card of Student
//API Working
router.post("/:studentId", verifyTokenStudent, studentAPI.studentDetails);

module.exports = router;

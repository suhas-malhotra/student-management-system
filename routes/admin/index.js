const express = require("express");
const adminAPI = require("../../controllers/admin/adminApi");
const { verifyTokenAdmin } = require("../../middleware/verifyToken");
const router = express.Router();

//Admin(Teacher) API
router.post("/teacher", verifyTokenAdmin, adminAPI.addTeacher);
router.post("/teacher/:teacherId", verifyTokenAdmin, adminAPI.deleteTeacher);
router.post("/allteachers", verifyTokenAdmin, adminAPI.allTeacher);

//Admin(Student) API
router.post("/student", verifyTokenAdmin, adminAPI.addStudent);
router.post("/student/:studentId", verifyTokenAdmin, adminAPI.deleteStudent);
router.post("/allstudents", verifyTokenAdmin, adminAPI.allStudent);

module.exports = router;

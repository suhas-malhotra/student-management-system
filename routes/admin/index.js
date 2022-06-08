const express = require("express");
const adminAPI = require("../../controllers/admin/adminApi");
const { verifyTokenAdmin } = require("../../middleware/verifyToken");
const router = express.Router();

//Admin(Teacher) API

// API
// Adding teacher by admin
//API Working
router.post("/teacher", verifyTokenAdmin, adminAPI.addTeacher);

// API
// delete teacher by admin
//API Working
router.delete("/teacher/:teacherId", verifyTokenAdmin, adminAPI.deleteTeacher);

// API
// All Teachers
//API Working
router.get("/allteachers", verifyTokenAdmin, adminAPI.allTeacher);

//Admin(Student) API

// API
// Adding student by admin
//API Working
router.post("/student", verifyTokenAdmin, adminAPI.addStudent);

// API
// Deleting student by admin
//API Working
router.delete("/student/:studentId", verifyTokenAdmin, adminAPI.deleteStudent);

// API
// Displaying all student by admin
//API Working
router.get("/allstudents", verifyTokenAdmin, adminAPI.allStudent);

//Admin(Class) API
//Adding a class
//API Working
router.post("/class", verifyTokenAdmin, adminAPI.addClass);

//Adding Teacher to Class API
//API Working
router.post(
  "/teacher/:teacherId/class/:classId",
  verifyTokenAdmin,
  adminAPI.addTeacherToClass
);

//Adding Students to class API
//API Working
router.post(
  "/student/:studentId/class/:classId",
  verifyTokenAdmin,
  adminAPI.addStudentToClass
);

module.exports = router;

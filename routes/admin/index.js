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

//Admin(Class) API
router.post("/class", verifyTokenAdmin, adminAPI.addClass);

//Adding Teacher to Class API
router.post(
  "/teacher/:teacherId/class/:classId",
  verifyTokenAdmin,
  adminAPI.addTeacherToClass
);

//Adding Students to class API
router.post(
    "/student/:studentId/class/:classId",
    verifyTokenAdmin,
    adminAPI.addStudentToClass
  );
module.exports = router;

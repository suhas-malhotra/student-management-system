const express = require("express");
const teacherAPI = require("../../controllers/teacher/teacherApi");
const { verifyTokenTeacher } = require("../../middleware/verifyToken");
const router = express.Router();
// API 
// All students names of respective class
//API Working
router.get(
  "/:teacherId/allstudents",
  verifyTokenTeacher,
  teacherAPI.allStudents
);

// API 
// All student names with ranking
//API Working
router.get("/:teacherId/ranking", verifyTokenTeacher, teacherAPI.ranking);

// API 
// Adding marks of a respective student
//API Working
router.post(
  "/:teacherId/student/:studentId/make/report",
  verifyTokenTeacher,
  teacherAPI.makeReport
);
module.exports = router;

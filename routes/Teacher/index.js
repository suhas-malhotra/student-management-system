const express = require("express");
const teacherAPI = require("../../controllers/teacher/teacherApi");
const { verifyTokenTeacher } = require("../../middleware/verifyToken");
const router = express.Router();

router.post(
  "/:teacherId/allstudents",
  verifyTokenTeacher,
  teacherAPI.allStudents
);
router.post("/:teacherId/ranking/", verifyTokenTeacher, teacherAPI.ranking);
router.post(
  "/:teacherId/student/:studentId/make/report",
  verifyTokenTeacher,
  teacherAPI.makeReport
);
module.exports = router;

const express = require("express");
const studentAPI = require("../../controllers/student/studentApi");
const { verifyTokenStudent } = require("../../middleware/verifyToken");
const router = express.Router();

router.post("/:studentId", verifyTokenStudent, studentAPI.studentDetails);

module.exports = router;

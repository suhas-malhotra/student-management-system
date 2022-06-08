const express = require("express");
const Student = require("../../models/studentSchema");

module.exports.studentDetails = async (req, res) => {
  const { studentId } = req.params;
  let student = await Student.find({
    _id: studentId,
  });
  if (student.length == 0) {
    return res.status(404).json({ msg: "Invalid Student Id" });
  }
  let marks = [];
  if (student[0].subjects.length == 0) {
    return res.status(404).json({ msg: "Marks Not entered yet" });
  }
  for (let i = 0; i < student[0].subjects.length; i++) {
    marks.push(student[0].subjects[i].marks);
  }

  let sum = marks.reduce((a, b) => a + b, 0);
  let percentage = sum / marks.length;

  return res
    .status(400)
    .json({ subjects: student[0].subjects, percentage: percentage });
};

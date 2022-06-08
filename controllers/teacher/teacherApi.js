const express = require("express");
const Teacher = require("../../models/teacherSchema");
const Student = require("../../models/studentSchema");
const Class = require("../../models/classSchema");
module.exports.allStudents = async (req, res) => {
  const { teacherId } = req.params;
  let assignedClass = await Class.find({
    teacher: teacherId,
  });
  if (assignedClass.length == 0) {
    return res.status(404).json({ msg: "Class Not Assigned Yet" });
  }
  let students = [];
  for (let i = 0; i < assignedClass[0].students.length; i++) {
    let classStudent = await Student.find({
      _id: assignedClass[0].students[i],
    });
    students.push(classStudent[0].name);
  }
  students.sort();
  return res.status(400).send(students);
};
module.exports.ranking = async (req, res) => {
  const { teacherId } = req.params;
  let assignedClass = await Class.find({
    teacher: teacherId,
  });
  if (assignedClass.length == 0) {
    return res.status(404).json({ msg: "Class Not Assigned Yet" });
  }
  let students = [];
  for (let i = 0; i < assignedClass[0].students.length; i++) {
    let classStudent = await Student.find({
      _id: assignedClass[0].students[i],
    });
    let marks = [];
    for (let j = 0; j < classStudent[0].subjects.length; j++) {
      marks.push(classStudent[0].subjects[j].marks);
    }
    let sum = marks.reduce((a, b) => a + b, 0);
    let percentage = sum / marks.length;
    let obj = { name: classStudent[0].name, percentage: percentage };
    students.push(obj);
  }
  students.sort(function (a, b) {
    return a[1] - b[1];
  });
  return res.status(400).send(students);
};

module.exports.makeReport = async (req, res) => {
  const { studentId, teacherId } = req.params;

  let assignedClass = await Class.find({
    teacher: teacherId,
  });
  if (assignedClass.length == 0) {
    return res.status(404).json({ msg: "Class Not Assigned Yet" });
  }

  let assignedStudent = await Student.find({
    _id: studentId,
  });
  if (assignedStudent.length == 0) {
    return res.status(404).json({ msg: "Invalid Student Id" });
  }
  const { subject, marks, date, comments } = req.body;
  if (marks > 100) {
    return res.status(401).json({ msg: "Invalid Marks" });
  }
  let obj = { subject, marks, date, comments };
  Student.updateOne(
    { _id: studentId },
    { $push: { subjects: [obj] } },
    (err, res) => {
      if (err) throw err;
    }
  );
  return res.status(400).json({ msg: "Marks added Successfully" });
};

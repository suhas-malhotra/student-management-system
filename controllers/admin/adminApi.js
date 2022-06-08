const express = require("express");
const Teacher = require("../../models/teacherSchema");
const Student = require("../../models/studentSchema");
const Class = require("../../models/classSchema");
module.exports.addTeacher = async (req, res) => {
  const { name, email, password } = req.body;
  let teacherDetails = new Teacher({
    name,
    email,
    password,
    class: "",
  });

  let alreadyAddedTeacher = await Teacher.find({
    email,
  });

  if (alreadyAddedTeacher.length >= 1) {
    return res.status(401).json({ msg: "Teacher Email already in use" });
  }

  teacherDetails
    .save()
    .then((response) => {
      // If everything goes as planed
      //use the retured user document for something
      return res
        .status(400)
        .json({ msg: "Teacher saved Successfully :)", id: response._id });
    })
    .catch((error) => {
      //When there are errors We handle them here
      console.log(err);
      res.status(404).json({ msg: "Bad Request" });
    });
};

module.exports.deleteTeacher = async (req, res) => {
  const id = req.params.teacherId;
  Teacher.deleteOne({ _id: id }, (err, obj) => {
    if (err)
      return res
        .status(404)
        .json({ msg: "Unable to find the teacher with given id" });
  });
  return res.status(400).json({ msg: "Teacher deleted Successfully :)" });
};

module.exports.allTeacher = async (req, res) => {
  Teacher.find({}, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(400).send(result);
    }
  });
};

module.exports.addStudent = async (req, res) => {
  const { name, email, password } = req.body;
  let studentDetails = new Student({
    name,
    email,
    password,
    class: "",
  });

  let alreadyAddedStudent = await Student.find({
    email,
  });

  if (alreadyAddedStudent.length >= 1) {
    return res.status(401).json({ msg: "Student Email already in use" });
  }
  studentDetails
    .save()
    .then((response) => {
      // If everything goes as planed
      //use the retured user document for something
      return res
        .status(400)
        .json({ msg: "Student saved Successfully :)", id: response._id });
    })
    .catch((error) => {
      //When there are errors We handle them here
      console.log(err);
      res.status(404).json({ msg: "Bad Request" });
    });
};

module.exports.deleteStudent = async (req, res) => {
  const id = req.params.studentId;
  Student.deleteOne({ _id: id }, (err, obj) => {
    if (err)
      return res
        .status(404)
        .json({ msg: "unable to find the student with given id" });
  });
  return res.status(400).json({ msg: "Student deleted Successfully :)" });
};

module.exports.allStudent = async (req, res) => {
  Student.find({}, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(400).send(result);
    }
  });
};

module.exports.addClass = async (req, res) => {
  const { name } = req.body;

  let classDetails = new Class({
    name,
  });

  let alreadyAddedClass = await Class.find({
    name,
  });

  if (alreadyAddedClass.length >= 1) {
    return res.status(401).json({ msg: "Class Email already in use" });
  }

  classDetails
    .save()
    .then((response) => {
      // If everything goes as planed
      //use the retured user document for something
      return res
        .status(400)
        .json({ msg: "Class saved Successfully :)", classId: response._id });
    })
    .catch((error) => {
      //When there are errors We handle them here
      console.log(err);
      res.status(404).json({ msg: "Bad Request" });
    });
};
module.exports.addTeacherToClass = async (req, res) => {
  const { teacherId, classId } = req.params;

  let alreadyAddedClass = await Class.find({
    _id: classId,
  });
  let alreadyAddedTeacher = await Teacher.find({
    _id: teacherId,
  });
  if (alreadyAddedClass.length == 0) {
    return res.status(404).json({ msg: "Class Not found" });
  }
  if (alreadyAddedTeacher.length == 0) {
    return res.status(404).json({ msg: "Teacher Not found" });
  }

  Class.updateOne(
    { _id: classId },
    { $set: { teacher: teacherId } },
    (err, res) => {
      if (err) throw err;
    }
  );

  return res.status(400).json({ msg: "Teacher added to class Successfully" });
};

module.exports.addStudentToClass = async (req, res) => {
  const { studentId, classId } = req.params;

  let alreadyAddedClass = await Class.find({
    _id: classId,
  });
  let alreadyAddedStudent = await Student.find({
    _id: studentId,
  });
  if (alreadyAddedClass.length == 0) {
    return res.status(404).json({ msg: "Class Not found" });
  }
  if (alreadyAddedStudent.length == 0) {
    return res.status(404).json({ msg: "Student Not found" });
  }

  Class.updateOne(
    { _id: classId },
    { $push: { students: [studentId] } },
    (err, res) => {
      if (err) throw err;
    }
  );
  return res.status(400).json({ msg: "Student added to class Successfully" });
};

const express = require("express");
const Teacher = require("../../models/teacherSchema");
const Student = require("../../models/studentSchema");
const Class = require("../../models/classSchema");

//controller
//adding teacher in the database
//by admin
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
  //if email already in use by any other teacher
  if (alreadyAddedTeacher.length >= 1) {
    return res.status(401).json({ msg: "Teacher Email already in use" });
  }
  //saving teacher details in the database
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
      res.status(404).json({ msg: "Bad Request" });
    });
};

//controller
//deleting teacher from the database
//by admin
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

//controller
//displaying all teacher from the database
//by admin
module.exports.allTeacher = async (req, res) => {
  Teacher.find({}, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(400).send(result);
    }
  });
};

//controller
//adding student in the database
//by admin
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
  //if student email already in use
  if (alreadyAddedStudent.length >= 1) {
    return res.status(401).json({ msg: "Student Email already in use" });
  }
  //saving student details in the database
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
      res.status(404).json({ msg: "Bad Request" });
    });
};

//controller
//deleting student from the database
//by admin
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

//controller
//displaying all students from the database
//by admin
module.exports.allStudent = async (req, res) => {
  Student.find({}, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(400).send(result);
    }
  });
};

//controller
//adding class in the database
//by admin
module.exports.addClass = async (req, res) => {
  const { name } = req.body;

  let classDetails = new Class({
    name,
  });

  let alreadyAddedClass = await Class.find({
    name,
  });
  //if class name already in use
  if (alreadyAddedClass.length >= 1) {
    return res.status(401).json({ msg: "Class Email already in use" });
  }
  //saving the class details in the database
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
      res.status(404).json({ msg: "Bad Request" });
    });
};

//controller
//adding teacher to the class
//by admin
module.exports.addTeacherToClass = async (req, res) => {
  const { teacherId, classId } = req.params;

  let alreadyAddedClass = await Class.find({
    _id: classId,
  });
  let alreadyAddedTeacher = await Teacher.find({
    _id: teacherId,
  });
  //if class id is invalid
  if (alreadyAddedClass.length == 0) {
    return res.status(404).json({ msg: "Class Not found" });
  }

  //if teacher id is invalid
  if (alreadyAddedTeacher.length == 0) {
    return res.status(404).json({ msg: "Teacher Not found" });
  }
//adding teacher to the class
  Class.updateOne(
    { _id: classId },
    { $set: { teacher: teacherId } },
    (err, res) => {
      if (err) throw err;
    }
  );

  return res.status(400).json({ msg: "Teacher added to class Successfully" });
};

//controller
//adding students to the class
//by admin
module.exports.addStudentToClass = async (req, res) => {
  const { studentId, classId } = req.params;

  let alreadyAddedClass = await Class.find({
    _id: classId,
  });

  let alreadyAddedStudent = await Student.find({
    _id: studentId,
  });
  //if class id is invalid
  if (alreadyAddedClass.length == 0) {
    return res.status(404).json({ msg: "Class Not found" });
  }
  //if student id is invalid
  if (alreadyAddedStudent.length == 0) {
    return res.status(404).json({ msg: "Student Not found" });
  }
  //adding student to the class
  Class.updateOne(
    { _id: classId },
    { $push: { students: [studentId] } },
    (err, res) => {
      if (err) throw err;
    }
  );
  return res.status(400).json({ msg: "Student added to class Successfully" });
};

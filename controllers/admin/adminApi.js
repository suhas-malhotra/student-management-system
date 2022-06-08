const express = require("express");
const Teacher = require("../../models/teacherSchema");
const Student = require("../../models/studentSchema");
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
        .json({ msg: "unable to find the teacher with given id" });
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

const express = require("express");
const JWT = require("jsonwebtoken");
const Admin = require("../../models/adminSchema");
const Teacher = require("../../models/teacherSchema");
const Student = require("../../models/studentSchema");
//controller
//admin authentication
//by admin
module.exports.Adminlogin = async (req, res) => {
  const { email, password } = req.body;
  let admin = await Admin.find({
    email,
  });
  //if invalid admin email
  if (admin.length == 0) {
    return res.status(401).json({ msg: "Admin not found" });
  }
  //if password do not match
  if (admin[0].password !== password) {
    return res.status(401).json({ msg: "Incorrect password" });
  }
  //creating token for 365 days
  const token = JWT.sign({ admin }, process.env.SECRET_TOKEN_ADMIN, {
    expiresIn: "365d",
  });
  admin.push({ token: token });
  admin[0].password = "";
  return res.status(400).json(admin);
};
//controller
//student authentication
//by student
module.exports.Studentlogin = async (req, res) => {
  const { email, password } = req.body;
  let student = await Student.find({
    email,
  });
  //if invalid student email
  if (student.length == 0) {
    return res.status(401).json({ msg: "Student not found" });
  }
  //if password do not match
  if (student[0].password !== password) {
    return res.status(401).json({ msg: "Incorrect password" });
  }
  //creating student token for 365 days
  const token = JWT.sign({ student }, process.env.SECRET_TOKEN_STUDENT, {
    expiresIn: "365d",
  });
  student.push({ token: token });
  student[0].password = "";
  return res.status(400).json(student);
};
//controller
//teacher authentication
//by teacher
module.exports.Teacherlogin = async (req, res) => {
  const { email, password } = req.body;
  let teacher = await Teacher.find({
    email,
  });
  //if invalid teacher email
  if (teacher.length == 0) {
    return res.status(401).json({ msg: "Teacher not found" });
  }
  //if password do not match
  if (teacher[0].password !== password) {
    return res.status(401).json({ msg: "Incorrect password" });
  }
  // creating teacher token for 365 days
  const token = JWT.sign({ teacher }, process.env.SECRET_TOKEN_TEACHER, {
    expiresIn: "365d",
  });
  teacher.push({ token: token });
  teacher[0].password = "";
  return res.status(400).json(teacher);
};

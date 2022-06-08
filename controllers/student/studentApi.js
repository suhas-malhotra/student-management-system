const express = require("express");
const Student = require("../../models/studentSchema");

module.exports.studentDetails = async (req, res) => {
  const { studentId } = req.params;
  let student = await Student.find({
    _id: studentId,
  });
};

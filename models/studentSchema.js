const { Schema, model } = require("mongoose");
const SubjectsSchema = new Schema({
  subject: String,
  marks: Number,
});
const studentSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    class: String,
    subjects: [SubjectsSchema],
  },
  { collection: "Student" }
);

module.exports = model("Student", studentSchema);

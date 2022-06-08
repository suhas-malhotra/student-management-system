const { Schema, model } = require("mongoose");
const studentSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    class: String,
  },
  { collection: "Student" }
);

module.exports = model("Student", studentSchema);

const { Schema, model } = require("mongoose");
const teacherSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    class: String,
  },
  { collection: "Teacher" }
);

module.exports = model("Teacher", teacherSchema);

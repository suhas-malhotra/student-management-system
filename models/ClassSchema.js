const { Schema, model } = require("mongoose");
// const studentSchema = new Schema({
//   name: String,
// });
const classSchema = new Schema(
  {
    name: String,
    teacher: String,
    students: [String],
  },
  { collection: "Class" }
);

module.exports = model("Class", classSchema);

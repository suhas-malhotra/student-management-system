const { Schema, model } = require("mongoose");
const adminSchema = new Schema(
  {
    email: String,
    name: String,
    role: String,
    password: String,
  },
  { collection: "Admin" }
);

module.exports = model("Admin", adminSchema);

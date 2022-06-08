const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin"));
router.use("/auth", require("./auth"));
router.use("/student", require("./student"));
router.use("/teacher", require("./teacher"));

module.exports = router;

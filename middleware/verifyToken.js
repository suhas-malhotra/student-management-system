const jwt = require("jsonwebtoken");
function verifyTokenAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  console.log("HI");
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN_ADMIN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function verifyTokenStudent(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN_STUDENT, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function verifyTokenTeacher(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN_TEACHER, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { verifyTokenTeacher, verifyTokenAdmin, verifyTokenStudent };
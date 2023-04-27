const { BadRequestError } = require("../errors");
const UnAuthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;

  console.log("token", token);

  if (!token) throw new BadRequestError("login first");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
  } catch (err) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  console.log("here");

  return next();
};

module.exports = isLoggedIn;

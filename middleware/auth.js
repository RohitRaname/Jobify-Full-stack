const UnAuthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  console.log('token',token)


  if (!token) throw new UnAuthenticatedError("Authentication invalid");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
  } catch (err) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  console.log("here");

  return next();
};

module.exports = authenticateUser;

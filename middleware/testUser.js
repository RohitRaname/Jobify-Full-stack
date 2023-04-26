const { BadRequestError } = require("../errors");

module.exports = (req, res, next) => {
  if (req.user.userId === "6448d595985ec676fd866f77")
    throw new BadRequestError("Test User! Read access only");

  next();
};

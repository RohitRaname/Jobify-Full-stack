const {UnAuthenticatedError}= require('../errors')

const checkPermission = (reqUser, resourceUserId) => {
    console.log(reqUser,resourceUserId)

  if (reqUser.userId.toString() !== resourceUserId.toString())
    throw new UnAuthenticatedError("Not authorized to access this route");

  return true;
};

module.exports = checkPermission;

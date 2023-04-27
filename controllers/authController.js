const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnAuthenticatedError } = require("../errors/index");

const User = require("../models/User.js");
const sendCookie = require("../utils/sendCookie");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new BadRequestError("Provide all values");

  const userAlreadyExists = await User.findOne({ email }).exec();
  if (userAlreadyExists) throw new BadRequestError("Email already in use");

  const user = await User.create(req.body);
  const token = user.createJWT();

  sendCookie(res, token);

  return res.status(StatusCodes.CREATED).json({
    msg: "user create",

    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new BadRequestError("Provide all values");

  const user = await User.findOne({ email }).select("+password").exec();
  if (!user) throw new UnAuthenticatedError("Invalid Credentials");

  const passwordCorrect = await user.comparePassword(
    password.toString(),
    user.password
  );
  if (!passwordCorrect) throw new UnAuthenticatedError("Invalid Credentials");

  user.password = undefined;

  const token = user.createJWT();
  sendCookie(res, token);

  return res.status(StatusCodes.OK).json({ user });
};

const getCurUser = async (req, res) => {
  const userId= req.user.userId;
  const user = await User.findOne({_id:userId});
  return res.status(StatusCodes.OK).json({ user });
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(StatusCodes.OK).json({ msg: "logout user successful" });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;

  console.log("come -here ");

  if (!email || !lastName || !location || !name)
    throw new BadRequestError("Provide all values");

  // we are doing so we can use methods define
  // const user = await User.findOne({ _id: req.user.userId });
  // user.email = email;
  // user.name = name;
  // user.lastName = lastName;
  // user.location = location;

  // await user.save();

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    {
      $set: {
        email,
        name,
        lastName,
        location,
      },
    },
    {
      new: true,
    }
  );

  const token = user.createJWT();
  sendCookie(res, token);

  return res.status(StatusCodes.OK).json({ user });
};

module.exports = { register, login, updateUser, getCurUser, logout };

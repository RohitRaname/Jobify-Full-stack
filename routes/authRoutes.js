const express = require("express");
const {
  register,
  login,
  updateUser,
  getCurUser,
  logout,
} = require("../controllers/authController.js");

const authenticateUser = require("../middleware/auth.js");
const rateLimiter = require("express-rate-limit");
const testUser = require("../middleware/testUser.js");
const isLoggedIn = require("../middleware/isLoggedIn.js");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again after 15mins",
});
const router = express.Router();

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);


router.get('/getCurrentUser',isLoggedIn, getCurUser)

router.use(authenticateUser);
router.patch("/updateUser", testUser, updateUser);
router.get('/logout',logout)

module.exports = router;

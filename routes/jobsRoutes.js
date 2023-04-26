const express = require("express");

const authenticateUser = require("../middleware/auth.js");

const {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
  showStats,
} = require("../controllers/jobsController.js");
const testUser = require("../middleware/testUser.js");

const router = express.Router();

router.use(authenticateUser);

router.route("/").get(getJobs).post(testUser, createJob);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .patch(testUser, updateJob)
  .delete(testUser, deleteJob)
  .get(getJob);

module.exports = router;

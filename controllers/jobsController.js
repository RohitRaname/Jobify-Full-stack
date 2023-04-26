const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");

const Job = require("../models/Job");
const checkPermission = require("../middleware/checkPermission");
const { BadRequestError, NotFoundError } = require("../errors/index");

const createJob = async (req, res) => {
  const userId = req.user.userId;
  const { company, position, jobLocation, status, jobType } = req.body;

  if (!company || !position) throw new BadRequestError("Provide all values");

  console.log("userId", userId);

  const job = await Job.create({
    createdBy: userId,
    company,
    position,
    jobLocation,
    status,
    jobType,
  });

  res.status(StatusCodes.CREATED).json({ job });
};

const getJob = async (req, res) => {
  const userId = req.user.userId;
  const jobs = await Job.find({ createdBy: userId }).exec();

  return res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
  // res.send("high performer captured);
};

const getJobs = async (req, res) => {
  const userId = req.user.userId;

  const { search, jobStatus, jobType, sort } = req.query;

  let result, jobs, numOfPages;
  const queryObj = { createdBy: userId };

  if (search !== "" && search)
    queryObj.position = {
      $regex: search,
      $options: "i",
    };

  if (jobStatus && jobStatus !== "all") queryObj.status = jobStatus;
  if (jobType && jobType !== "all") queryObj.jobType = jobType;

  result = Job.find(queryObj);

  if (sort === "latest") result.sort = { $sort: "-createdAt" };
  if (sort === "oldest") result.sort = { $sort: "createdAt" };
  if (sort === "a-z") result.sort = { $sort: "position" };
  if (sort === "z-a") result.sort = { $sort: "-position" };

  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  result.skip(skip).limit(limit);

  [jobs, totalJobs] = await Promise.all([result, Job.countDocuments(queryObj)]);

  numOfPages = Math.ceil(totalJobs / limit);

  return res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });
  if (!job) throw new NotFoundError(`Job with ${jobId} does not exist`);

  checkPermission(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });
  if (!job) throw new Error(`Job ${jobId} not found`);

  checkPermission(req.user, job.createdBy);

  await Job.findOneAndDelete({ _id: jobId });
  return res.status(StatusCodes.OK).json({ msg: "Success! Job removed." });
};

const showStats = async (req, res) => {
  const userId = req.user.userId;

  const agg = await Job.aggregate([
    {
      $facet: {
        stats: [
          {
            $match: {
              createdBy: new mongoose.Types.ObjectId(userId),
            },
          },

          {
            $group: {
              _id: "$status",
              count: {
                $sum: 1,
              },
            },
          },

          { $set: { status: "$_id" } },

          { $unset: ["_id"] },
        ],

        monthlyApplications: [
          {
            $match: {
              createdBy: new mongoose.Types.ObjectId(userId),
            },
          },

          {
            $group: {
              _id: {
                month: { $month: { $toDate: "$createdAt" } },
                year: { $year: { $toDate: "$createdAt" } },
              },
              count: { $sum: 1 },
            },
          },

          {
            $sort: {
              "_id.year": -1,
              "_id.month": -1,
            },
          },

          { $limit: 6 },

          {
            $set: {
              month: "$_id.month",
              year: "$_id.year",
            },
          },

          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1,
            },
          },

          { $unset: ["_id"] },
        ],
      },
    },
  ]);

  let { stats, monthlyApplications } = agg[0];
  stats = stats.reduce((acc, stat) => {
    acc[stat.status] = stat.count;
    return acc;
  }, {});

  console.log("stats", stats);
  console.log("monthlyApplications", monthlyApplications);

  const defaultStats = {
    pending: stats.pending || 0,
    declined: stats.decline || 0,
    interviewed: stats.interview || 0,
  };

  monthlyApplications = monthlyApplications.map((item) => {
    const { month, year, count } = item;

    const date = moment()
      .month(month - 1)
      .year(year)
      .format("MMM Y");
    return { count, date };
  });

  // monthlyApplications= monthlyApplications[0].count

  return res.status(StatusCodes.OK).json({
    stats: defaultStats,
    monthlyApplications,
  });
};

module.exports = {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob,
  showStats,
};

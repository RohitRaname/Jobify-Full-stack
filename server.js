const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const rateLimiter = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, try again after 15mins",
});

const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const authRouter = require("./routes/authRoutes.js");
const jobsRouter = require("./routes/jobsRoutes.js");

// middleware
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! shutting dow...");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

const app = new express();
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());

dotenv.config({ path: ".env" });

// db and authenticate user
const connectDB = require("./db/connect");
connectDB();

// routers
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.use(express.json());

app.get("/success", (req, res) => res.send(userProfile));
app.get("/error", (req, res) => res.send("error logging in"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

// route does not match
app.use(notFoundMiddleware);

// err capture
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  console.log("server listening on ", port)
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down");
  console.log(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});

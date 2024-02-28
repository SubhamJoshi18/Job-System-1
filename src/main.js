import express from "express";
import morgan from "morgan";
import startDB from "./db/mongodb.js";
import authrouter from "./router/auth.route.js";
import jobrouter from "./router/job.route.js";
import createError from "http-errors";
import adminrouter from "./router/admin.route.js";
import { errorHandlermiddleware } from "./middlewares/error-handler.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
startDB();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authrouter);
app.use("/jobs", jobrouter);
app.use("/admin", adminrouter);
app.get("/", (req, res) => {
  console.log("You have entered the get method");
});

app.use(async (req, res, next) => {
  next(createError.BadGateway("THE Route does no exist"));
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.json({
    Error: true,
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.use(errorHandlermiddleware);
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on the http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

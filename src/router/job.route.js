import { Router } from "express";
import {
  getAllJobs,
  getJobs,
  createJobs,
  updateJobs,
  DeleteJobs,
} from "../controller/job.js";
import { isAdmin, verifyaccessToken } from "../middlewares/verify.js";
import { isUser } from "../middlewares/verify.js";
const jobrouter = Router();

jobrouter.get("/", verifyaccessToken, isUser, getAllJobs);
jobrouter.get("/:id", verifyaccessToken, isUser, getJobs);
jobrouter.post("/", verifyaccessToken, isUser, createJobs);
jobrouter.patch("/:id", verifyaccessToken, isUser, updateJobs);
jobrouter.delete("/:id", verifyaccessToken, isUser, DeleteJobs);

export default jobrouter;

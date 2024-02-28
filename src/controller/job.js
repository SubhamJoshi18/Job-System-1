import jobsModel from "../models/jobs.js";
import createStatus from "http-status-codes";
export const getAllJobs = async (req, res, next) => {
  try {
    const findall = await jobsModel.find({});
    if (!findall) {
      return res.status(createStatus.BAD_GATEWAY).json({
        message: "No jobs are foun",
      });
    }

    return res.status(createStatus.ACCEPTED).json({
      Error: false,
      message: "Here are the list of the jobs",
      Jobs: {
        findall,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getJobs = async (req, res, next) => {
  const id = req.params.id;
  const findId = await jobsModel.findById({ _id: id });
  if (!findId) {
    return res.status(createStatus.BAD_REQUEST).json({
      Error: true,
      message: "ID DOES NOT EXIST",
    });
  }
  return res.status(createStatus.OK).json({
    Error: true,
    message: "Here is the Id you Searched",
    Jobs: {
      findId,
    },
  });
};

export const createJobs = async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const newuser = await jobsModel.create(req.body);
  return res.json(newuser);
};

export const updateJobs = async (req, res, next) => {
  try {
    const {
      body: { company, position },
    } = req;
    if (company === "" || position === "") {
      return res.status(createStatus.BAD_GATEWAY).json({
        Error: true,
        message: "Missing Company and Position Field",
      });
    }
    const id = req.params.id;
    const updatetheJob = await jobsModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true },
      { runValidator: true }
    );

    return res.status(createStatus.OK).json({
      Error: true,
      message: "ID update SuccessFully",
      UpdatedJobs: {
        updatetheJob,
      },
    });
    //const  updatetheJob = await jobsModel.findOneAndUpdate({_id:id}, {$set:{company:req.body.company,position:req.body.position}});
  } catch (err) {
    next(err);
  }
};

export const DeleteJobs = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findtheUser = await jobsModel.findOne({ _id: id });
    if (!findtheUser) {
      return res.status(createStatus.BAD_GATEWAY).json({
        message: "The job you are trying to Delete Does not exist",
      });
    }
    const deleteTheUser = await jobsModel.deleteOne({ _id: id });
    return res.status(createStatus.OK).json({
      Success: true,
      message: "The ID has been Deleted",
    });
  } catch (err) {
    next(err);
  }
};

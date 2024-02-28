import createStatus from "http-status-codes";
import createError from "http-errors";
import userModel from "../models/user.js";

export const GetAllUser = async (req, res, next) => {
  try {
    const findAll = await userModel.find({});
    if (!findAll) {
      return res.status(createStatus.CONFLICT).json({
        message: "No any User Found",
      });
    }
    return res.status(createStatus.OK).json({
      Success: true,
      message: "Here is the List of the User",
      UserData: {
        findAll,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const findtheUser = await userModel.findOne({ name: name });
    if (!findtheUser) {
      return res.status(createStatus.CONFLICT).json({
        Error: true,
        message: "The User you are trying to Delete Does Not Exist, Sorry Sir!",
      });
    }
    const deletetheUser = await userModel.deleteOne({ name: name });
    return res.status(createStatus.OK).json({
      Error: false,
      message: "The following User has been Deleted SuccessFully",
    });
  } catch (err) {
    next(err);
  }
};

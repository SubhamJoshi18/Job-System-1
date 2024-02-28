import userModel from "../models/user.js";
import createStatus from "http-status-codes";
import { AccessToken, RefreshToken } from "../helpers/token-generate.js";
import { verifyRefreshToken } from "../middlewares/verify.js";

import bcrypt from "bcryptjs";
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(createStatus.NOT_ACCEPTABLE).json({
        Error: true,
        message: "Missing Fields Name,Email and Password",
      });
    }

    const ChecKEmail = await userModel.findOne({ email: email });
    if (ChecKEmail) {
      return res.status(createStatus.CONFLICT).json({
        Errror: true,
        message: "Email you have entered has been already Registered",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedpassword,
      role: role,
    });
    const created = await newUser.save();
    console.log(created);
    const accesstoken = await AccessToken(created._id, created.name);
    const refreshtoken = await RefreshToken(created._id, created.name);
    return res.status(createStatus.OK).json({
      message: "User Created SuccessFully",
      User: {
        created,
      },
      message2: "Here is your AccessToken",
      AccessToken: {
        accesstoken,
      },
      message3: "Here is your RefreshToken",
      RefreshToken: {
        refreshtoken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(createStatus.NOT_ACCEPTABLE).json({
        message: "Missing Field Please Enter Password Or Email",
      });
    }
    const checkEmail = await userModel.findOne({ email: email });
    if (!checkEmail) {
      return res.status(createStatus.NOT_FOUND).json({
        Error: true,
        message: "The Email you have entered Does not exist",
      });
    }
    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword) {
      return res.status(createStatus.UNAUTHORIZED).json({
        Error: true,
        message:
          "The password you have entered does not match ! Please Try again",
      });
    }
    const accessToken = await AccessToken(checkEmail._id, checkEmail.name);
    const refreshtoken = await RefreshToken(checkEmail._id, checkEmail.name);
    return res.status(createStatus.OK).json({
      Success: true,
      message: "You have SuccessFully Logged In",
      AccessToken: {
        accessToken,
      },
      RefreshToken: {
        refreshtoken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const refreshtoken = async (req, res, next) => {
  try {
    const { refreshtoken } = req.body;
    if (!refreshtoken) {
      return res.status(createStatus.NOT_FOUND).json({
        Error: true,
        message: "Refresh Token not found",
      });
    }
    const { userId, name } = await verifyRefreshToken(refreshtoken);
    const newAccessToken = await AccessToken(userId, name);
    const newRefreshToken = await RefreshToken(userId, name);
    return res.status(createStatus.OK).json({
      Success: true,
      message: "Created a new Access Token and Refresh Token",
      NewAccessToken: {
        newAccessToken,
      },
      newRefreshToken: {
        newRefreshToken,
      },
    });
  } catch (err) {}
};

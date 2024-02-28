import jwt from "jsonwebtoken";
import createStatus from "http-errors";
import userModel from "../models/user.js";
import createError from "http-errors";

export const verifyaccessToken = async function (req, res, next) {
  console.log(req.headers["authorization"]);
  const authToken = req.headers["authorization"];
  if (!authToken) {
    return res.status(createStatus.Unauthorized).json({
      message: "Missing Access Token",
    });
  }
  const bearer = authToken.split(" ");
  const token = bearer[1];
  const secret = process.env.ACCESS_TOKEN;
  console.log(bearer);
  console.log(token);
  jwt.verify(token, secret, async (err, payload) => {
    if (err) {
      return res.status(createStatus.Unauthorized).json({
        message: "Invalid Access Token",
      });
    }
    console.log(payload);
    const checkUser = await userModel.findOne({ _id: payload.aud });
    if (!checkUser) {
      return res.status(createStatus.NotFound).json({
        message: "User is Not Logged In",
      });
    }
    console.log(checkUser);
    req.user = checkUser;
    console.log(req.user);
    next();
  });
};

export const isUser = async function (req, res, next) {
  if (req.user.role === "user") {
    console.log("You are a User");
    next();
  } else if (!req.user.role === "user" && !req.user.role === "admin") {
    return res.status(createStatus.Unauthorized).json({
      message: "You are not a User nor An Admin",
    });
  } else {
    return res.status(createStatus.InternalServerError).json({
      message: "INTERNAL SERVER ERROR",
    });
  }
};

export const isAdmin = async function (req, res, next) {
  if (req.user.role === "admin") {
    console.log("You are An Admin");
    next();
  } else {
    return res.status(createStatus.Unauthorized).json({
      message: "You are not an Admin",
    });
  }
};

export const verifyRefreshToken = async function (refreshtoken) {
  return new Promise((resolve, reject) => {
    const token = refreshtoken;
    const secret = process.env.REFRESH_TOKEN;
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        reject(createError.Unauthorized);
      } else {
        const userId = payload.aud;
        const name = payload.userName;
        resolve(userId, name);
      }
    });
  });
};

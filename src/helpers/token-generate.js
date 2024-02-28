import jwt from "jsonwebtoken";
import createError from "http-errors";

export const AccessToken = async function (userId, userName) {
  return new Promise((resolve, reject) => {
    const payload = {
      aud: userId,
      userName: userName,
    };
    const secret = process.env.ACCESS_TOKEN;
    const options = {
      issuer: "Subham Joshi",
      expiresIn: "1h",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.Unauthorized("Invalid Acccess Token"));
      }
      resolve(token);
    });
  });
};

export const RefreshToken = async function (userId, userName) {
  return new Promise((resolve, reject) => {
    const payload = {
      aud: userId,
      userName: userName,
    };
    const secret = process.env.REFRESH_TOKEN;
    const options = {
      issuer: "Subham Joshi",
      expiresIn: "1y",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.Unauthorized("Invalid Refresh Token"));
      }
      resolve(token);
    });
  });
};

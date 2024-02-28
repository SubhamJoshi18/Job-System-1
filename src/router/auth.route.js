import { Router } from "express";
import { register, login } from "../controller/auth.js";
import { verifyaccessToken, isAdmin, isUser } from "../middlewares/verify.js";
const authrouter = Router();

authrouter.post("/signup", register);
authrouter.post("/login", login);
authrouter.get("/check", verifyaccessToken, isAdmin, (req, res) => {
  res.json({
    message: "You are verified",
  });
});

export default authrouter;

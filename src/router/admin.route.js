import { Router } from "express";
import { verifyaccessToken } from "../middlewares/verify.js";
import { isAdmin, isUser } from "../middlewares/verify.js";
import { GetAllUser, deleteUser } from "../controller/admin.js";
const adminrouter = Router();
adminrouter.get("/", verifyaccessToken, isAdmin, GetAllUser);
adminrouter.delete("/delete", verifyaccessToken, isAdmin, deleteUser);

export default adminrouter;

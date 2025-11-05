import express from "express";
import { verifyToken } from "../Middleware/VerifyToken.js";
import { getAllUsers, getUserPolicies, getUserClaims } from "../controller/AdminController.js";
import { addPolicy } from "../controller/PolicyController.js";
import { login } from "../controller/LoginController.js";

const router = express.Router();

// 🧩 Admin login
router.post("/login", login);

// 🧩 Admin-only routes (protected)
router.get("/users", verifyToken, getAllUsers);
router.get("/userpolicies/:user_id", verifyToken, getUserPolicies);
router.get("/userclaims/:user_id", verifyToken, getUserClaims);

// 🧩 Policy management (admin adds policy)
router.post("/addpolicy", verifyToken, addPolicy);

export default router;

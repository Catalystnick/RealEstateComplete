import express from "express";
import { isAdmin, isLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//verifyToken middleware function
router.get("/loggedIn", verifyToken, isLoggedIn);
router.get("/isAdmin", isAdmin);

export default router;

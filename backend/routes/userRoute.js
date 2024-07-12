import express from "express";
import { signup,signin,logout,getAllUser} from "../controllers/userController.js";
import { authenticate,authAdmin } from "../middlewares/authMiddleware.js";
const router=express.Router();


router.post('/signup',signup);
router.post('/signin',signin);
router.post('/logout',logout,authenticate);
router.get("/admin",getAllUser,authenticate,authAdmin);

export default router;
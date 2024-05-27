import { Router } from "express";
import {
    loginUser,
    userSignup
} from "../controllers/Auth.controller.js";
import { otp } from "../otp/SendOtp.js";


const router = Router();


router.route('/userSignup').post(userSignup);
router.route('/register').post(loginUser);
router.route('/otp').post(otp);



export default router;
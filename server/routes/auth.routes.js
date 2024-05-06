import { Router } from "express";
import {
    loginUser,
    userSignup
} from "../controllers/Auth.controller.js";


const router = Router();


router.route('/userSignup').post(userSignup);
router.route('/register').post(loginUser);



export default router;
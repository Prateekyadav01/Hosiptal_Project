import { Router } from "express";
import {
    userSignup
} from "../controllers/Auth.controller.js";


const router = Router();


router.route('/userSignup').post(userSignup);



export default router;
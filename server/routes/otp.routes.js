import {Router} from "express"
import { sendOTPVerification} from '../controllers/OTP.controller.js'


const router = Router()



router.route("/sendotp").post(sendOTPVerification);

export default router;
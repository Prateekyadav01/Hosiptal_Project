import {Router} from "express";
import { paymentOrder, verifyPayment } from '../controllers/Payment.controller.js';
import { authVerifyMiddleware } from "../middleware/auth.middleware.js";


const router = Router();


router.route('/order').post(authVerifyMiddleware,paymentOrder);
router.route('/verify').post(authVerifyMiddleware,verifyPayment);


export default router;
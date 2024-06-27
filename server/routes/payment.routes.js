import {Router} from "express";
import { paymentOrder, verifyPayment } from '../controllers/Payment.controller.js';


const router = Router();


router.route('/order').post(paymentOrder);
router.route('/verify').post(verifyPayment);


export default router;
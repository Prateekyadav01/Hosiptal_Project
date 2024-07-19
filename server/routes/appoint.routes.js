import {Router} from 'express';  
import { appointDetails } from '../controllers/AppointMent.controller.js';
import { authVerifyMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/appointcheck').post(authVerifyMiddleware,appointDetails);


export default router;
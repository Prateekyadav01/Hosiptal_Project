import {Router} from 'express';  
import { appointDetails } from '../controllers/AppointMent.controller.js';

const router = Router();

router.route('/appointcheck').post(appointDetails);


export default router;
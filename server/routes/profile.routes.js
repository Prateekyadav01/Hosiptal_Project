import { Router } from "express";
import { uploadFile } from "../controllers/Profile.controller.js";

const router = Router();


router.route('/profileImage').post(uploadFile);

export default router;
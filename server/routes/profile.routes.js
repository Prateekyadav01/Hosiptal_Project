import { Router } from "express";
import { downloadFile, shareableLink, uploadFile } from "../controllers/Profile.controller.js";

const router = Router();


router.route('/profileImage').post(uploadFile);
router.route('/profileImage/:fileId').get(shareableLink);
router.route('/profileImage/download/:fileId').get(downloadFile);

export default router;
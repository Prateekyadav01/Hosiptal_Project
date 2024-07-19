import { Router } from "express";
import { downloadFile, shareableLink, uploadFile } from "../controllers/Profile.controller.js";
import { authVerifyMiddleware } from "../middleware/auth.middleware.js";

const router = Router();


router.route('/profileImage').post(authVerifyMiddleware,uploadFile);
router.route('/profileImage/:fileId').get(authVerifyMiddleware,shareableLink);
router.route('/profileImage/download/:fileId').get(authVerifyMiddleware,downloadFile);

export default router;
import express from "express";
import { 
  getDeviceListController,
  uploadDeviceData 
} from "../controllers/device.controller.js";
import authMiddleware from '../../middleware/auth.middleware.js';
import * as errorMiddleware from '../../middleware/error.middleware.js';

const router = express.Router();

router.get("/list", authMiddleware.verifyAccessToken, getDeviceListController);

//뭐가 문제일까
router.post("/upload", uploadDeviceData);

router.use(errorMiddleware.errorHandler);

export default router;
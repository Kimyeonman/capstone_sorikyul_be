import express from "express";
import { getDeviceListController } from "../controllers/device.controller.js";
import authMiddleware from '../../middleware/auth.middleware.js';
import * as errorMiddleware from '../../middleware/error.middleware.js';

const router = express.Router();

router.get("/list", authMiddleware.verifyAccessToken, getDeviceListController);

router.post("/upload", uploadDeviceData);

router.use(errorMiddleware.errorHandler);

export default router;
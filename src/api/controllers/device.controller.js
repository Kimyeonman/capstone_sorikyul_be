import { asyncHandler } from "../../middleware/error.middleware.js";
import { 
  getDeviceList,
  saveDeviceRecords
} from "../services/device.service.js";
import HTTP_STATUS from "../../constants/http.constant.js";
import { successResponse } from "../../utils/response.util.js";

export const getDeviceListController = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const tokenPayload = req.auth;

  const adminSerialNum = req.query.serialNum || null;
  
  const data = await getDeviceList(tokenPayload, Number(page), Number(limit),adminSerialNum);

  return res
    .status(HTTP_STATUS.OK)
    .json(
      successResponse({
        data,
        message: "디바이스 기반 로그 조회 성공",
      })
    );
});



export const uploadDeviceData = asyncHandler(async (req, res) => {
  const { serialNum, records } = req.body;

  const result = await saveDeviceRecords(serialNum, records);

  res.status(HTTP_STATUS.CREATED).json(
    successResponse({
      data: result,
    })
  );
});
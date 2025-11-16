import { asyncHandler } from "../../middleware/error.middleware.js";
import { getDeviceList } from "../services/device.service.js";
import HTTP_STATUS from "../../constants/http.constant.js";
import { successResponse } from "../../utils/response.util.js";

export const getDeviceListController = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const tokenPayload = req.auth;

  const data = await getDeviceList(tokenPayload, Number(page), Number(limit));

  return res
    .status(HTTP_STATUS.OK)
    .json(
      successResponse({
        data,
        message: "디바이스 기반 로그 조회 성공",
      })
    );
});
import { 
  findDevicesBySerialNum,
  countDevicesBySerialNum,
} from "../repositories/device.repository.js";
import { findUserById } from "../repositories/auth.repository.js";
import { UnauthorizedError } from "../../utils/error.util.js"

export async function getDeviceList(tokenPayload, page = 1, limit = 10, adminSerialNum = null) {
  const userId = tokenPayload.userId;

  const user = await findUserById(userId);
  if (!user) {
    throw new UnauthorizedError("유효하지 않은 사용자입니다.");
  }

  let serialNum;
  if (user.role === "ADMIN" && adminSerialNum) {
    serialNum = adminSerialNum;
  }
  else {
    serialNum = user.serial_num;
  }

  const totalCount = await countDevicesBySerialNum(serialNum);
  const devices = await findDevicesBySerialNum(serialNum, page, limit);

  const list = devices.map(d => ({
    deviceId: d.device_id,
    type: {
      typeId: d.type.type_id,
      noiseTypes: d.type.nosise_types,
      resberryId: d.type.resberry_id
    },
    noise: {
      noiseId: d.noise.noise_id,
      dba: d.noise.dba,
      vibration: d.noise.vilbration,
      isNoise: d.noise.is_noise,
      createdAt: d.noise.created_at,
      updatedAt: d.noise.updated_at
    },
    createdAt: d.created_at,
    updatedAt: d.updated_at
  }));

  return {
    list,
    pagination: {
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit)
    }
  };
}
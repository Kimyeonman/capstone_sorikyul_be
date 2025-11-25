import { 
  findDevicesBySerialNum,
  countDevicesBySerialNum,
  createType,
  createNoise,
  createDevice,
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


// export async function saveDeviceRecords(serialNum, records) {
//   const created = [];

//   for (const rec of records) {
//     const label = rec.yamnet?.label ?? "unknown";
//     const dba = rec.noise?.dba ?? 0;
//     const vibration = rec.noise?.vibration ?? 0;

//     const type = await createType(label, serialNum);

//     const isNoise = dba > 60;
//     const noise = await createNoise(dba, vibration, isNoise);

//     const device = await createDevice(type.type_id, noise.noise_id);

//     created.push({
//       type,
//       noise,
//       device,
//     });
//   }

//   return {
//     serialNum,
//     count: created.length,
//     records: created,
//   };
// }

export async function saveDeviceRecords(serialNum, records) {
  const created = [];

  for (const rec of records) {
    const ts = rec.timestamp ? new Date(rec.timestamp) : new Date();

    const label = rec.yamnet?.label ?? "unknown";
    const dba = rec.noise?.dba ?? 0;
    const vibration = rec.noise?.vibration ?? 0;

    const type = await createType(label, serialNum, ts);

    const isNoise = dba > 40;
    const noise = await createNoise(dba, vibration, isNoise, ts);

    const device = await createDevice(type.type_id, noise.noise_id, ts);

    created.push({
      type,
      noise,
      device,
    });
  }

  return {
    serialNum,
    count: created.length,
    records: created,
  };
}
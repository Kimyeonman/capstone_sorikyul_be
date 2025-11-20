import prisma from "../../config/prisma.config.js"

export async function findDevicesBySerialNum(serialNum, page, limit) {
  const skip = (page - 1) * limit;

  return prisma.device.findMany({
    where: {
      type: {
        resberry_id: serialNum
      }
    },
    include: {
      type: true,
      noise: true
    },
    skip,
    take: limit,
    orderBy: { created_at: "desc" }
  });
}
export async function countDevicesBySerialNum(serialNum) {
  return prisma.device.count({
    where: {
      type: {
        resberry_id: serialNum
      }
    }
  });
}

export async function createNoise(dba, vibration, isNoise) {
  return prisma.noise.create({
    data: {
      dba,
      vilbration: String(vibration),
      is_noise: isNoise,
    },
  });
}

export async function createType(label, serialNum) {
  return prisma.type.create({
    data: {
      nosise_types: label,
      resberry_id: serialNum,
    },
  });
}

export async function createDevice(typeId, noiseId) {
  return prisma.device.create({
    data: {
      type_id: typeId,
      noise_id: noiseId,
    },
  });
}
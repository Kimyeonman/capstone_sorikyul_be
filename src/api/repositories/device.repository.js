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
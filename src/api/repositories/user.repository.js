import prisma from "../../config/prisma.config.js";

export async function findUserProfileByToken(user_id){
  return prisma.user.findUnique({
    where: { user_id },
    select: {
      user_id: true,
      email: true,
      nick_name: true,
      role: true,
      notice_set: true,
    },
  });
}

export async function updateUser(user_id, updateData){
  return prisma.user.update({
    where: { user_id },
    data: updateData,
    select: {
      user_id: true,
      nick_name: true,
      role: true,
    },
  });
}


export async function deleteUser(user_id) {
  return prisma.user.update({
    where: { user_id },
    data: { isDelete: true },
    select: {
      user_id: true,
    },
  });
}

export async function toggleUserNoticeSet(userId) {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
    select: { notice_set: true },
  });

  if (!user) return null;

  return prisma.user.update({
    where: { user_id: userId },
    data: { notice_set: !user.notice_set },
  });
}
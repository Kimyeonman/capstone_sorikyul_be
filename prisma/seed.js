import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding start...");

  const RPID1 = "A1B2C3D4E5F6";
  const RPID2 = "Z9Y8X7W6V5U4";

  const adminPass = await argon2.hash("admin123!");
  const userPass = await argon2.hash("user1234!");

  await prisma.device.deleteMany();
  await prisma.noise.deleteMany();
  await prisma.type.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 기존 데이터 초기화 완료");

  await prisma.user.create({
    data: {
      email: "admin@test.com",
      nick_name: "관리자",
      password: adminPass,
      role: "ADMIN",
      serial_num: "admin",
      refresh_token: "",
    },
  });

  await prisma.user.create({
    data: {
      email: "user1@test.com",
      nick_name: "유저1",
      password: userPass,
      role: "USER",
      serial_num: RPID1,
      refresh_token: "",
    },
  });

  await prisma.user.create({
    data: {
      email: "user2@test.com",
      nick_name: "유저2",
      password: userPass,
      role: "USER",
      serial_num: RPID2,
      refresh_token: "",
    },
  });

  console.log("👤 Users created");

  const type1 = await prisma.type.create({
    data: {
      nosise_types: "Washing machine running",
      resberry_id: RPID1,
    },
  });

  const type2 = await prisma.type.create({
    data: {
      nosise_types: "Air conditioner humming",
      resberry_id: RPID2,
    },
  });

  console.log("🔧 Types created");

  const noise1 = await prisma.noise.create({
    data: {
      dba: 78,
      vilbration: "4095",
      is_noise: true,
      created_at: new Date("2025-02-01T10:00:00"),
      updated_at: new Date("2025-02-01T10:00:00"),
    },
  });

  const noise2 = await prisma.noise.create({
    data: {
      dba: 34,
      vilbration: "120",
      is_noise: false,
      created_at: new Date("2025-02-01T11:00:00"),
      updated_at: new Date("2025-02-01T11:00:00"),
    },
  });

  console.log("🔊 Noise logs created");

  await prisma.device.create({
    data: {
      type_id: type1.type_id,
      noise_id: noise1.noise_id,
    },
  });

  await prisma.device.create({
    data: {
      type_id: type2.type_id,
      noise_id: noise2.noise_id,
    },
  });

  console.log("📦 Device logs created");
  console.log("🌱 Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

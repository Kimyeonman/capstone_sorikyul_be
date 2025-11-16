-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'KAKAO');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nick_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "notice_set" BOOLEAN NOT NULL DEFAULT false,
    "serial_num" TEXT,
    "provider" "Provider",
    "refresh_token" TEXT NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Noise" (
    "noise_id" TEXT NOT NULL,
    "dba" INTEGER NOT NULL,
    "vilbration" TEXT NOT NULL,
    "is_noise" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Noise_pkey" PRIMARY KEY ("noise_id")
);

-- CreateTable
CREATE TABLE "Type" (
    "type_id" TEXT NOT NULL,
    "nosise_types" TEXT NOT NULL,
    "resberry_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "Device" (
    "device_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "noise_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("device_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_noise_id_fkey" FOREIGN KEY ("noise_id") REFERENCES "Noise"("noise_id") ON DELETE RESTRICT ON UPDATE CASCADE;

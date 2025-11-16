// prisma/reset.js
const { execSync } = require("child_process");

console.log("\n🔄 Prisma DB Reset Script Starting...\n");

try {
  console.log("📌 Step 1) Dropping & Recreating Database (prisma migrate reset)...");
  execSync("npx prisma migrate reset --force --skip-seed", { stdio: "inherit" });

  console.log("\n📌 Step 2) Running migrations...");
  execSync("npx prisma migrate dev --name init", { stdio: "inherit" });

  console.log("\n📌 Step 3) Running seed script...");
  execSync("npx prisma db seed", { stdio: "inherit" });

  console.log("\n🎉 DB Reset + Seed Complete!\n");
} catch (err) {
  console.error("\n❌ Error during reset process:\n", err);
  process.exit(1);
}

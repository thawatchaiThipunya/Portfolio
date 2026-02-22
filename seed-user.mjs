import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = "thawatchai.thipinya@gmail.com"; // อีเมลของคุณ
  const password = "0896906841zaza"; // รหัสผ่านที่คุณใช้
  
  // เข้ารหัสผ่าน (Hashing) เพื่อความปลอดภัย
  const hashedPassword = await bcrypt.hash(password, 10);

  // สั่งบันทึกลงฐานข้อมูล (ถ้ามีอยู่แล้วจะไม่สร้างซ้ำ)
  await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      password: hashedPassword,
    },
  });

  console.log('✅ สร้างบัญชีแอดมินสำเร็จ: ' + email);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
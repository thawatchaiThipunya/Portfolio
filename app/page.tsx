import Link from "next/link";
import { AuthCard } from "@/app/components/ui/AuthCard";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <AuthCard title="ยินดีต้อนรับสู่ระบบ">
      <div className="flex flex-col gap-4">
        <p className="text-center text-zinc-600 mb-4">
          โปรเจกต์ Portfolio และระบบจัดการหลังบ้านของคุณ
        </p>
        
        {/* ใช้ Link ของ Next.js เพื่อความเร็วในการเปลี่ยนหน้า */}
        <Link href="/login">
          <Button variant="primary">ไปหน้าเข้าสู่ระบบ</Button>
        </Link>

        <Link href="/forgot-password">
          <Button variant="secondary">ลืมรหัสผ่าน?</Button>
        </Link>
      </div>
    </AuthCard>
  );
}
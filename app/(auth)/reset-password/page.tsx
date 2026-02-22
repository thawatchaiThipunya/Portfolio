"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { AuthCard } from "@/app/components/ui/AuthCard";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";


function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMsg({ type: "error", text: "รหัสผ่านไม่ตรงกัน" });
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/auth/resetpass", {
        token,
        newPassword: passwords.newPassword
      });
      setMsg({ type: "success", text: "เปลี่ยนรหัสผ่านสำเร็จ! กำลังพากลับไปหน้า Login..." });
      
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      setMsg({ 
        type: "error", 
        text: axiosError.response?.data?.error || "Token หมดอายุหรือลิงก์ไม่ถูกต้อง" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[450px] z-10 animate-in fade-in zoom-in duration-500">
      <AuthCard title="">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 shadow-inner">
             <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Set New Password</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">
              สร้างรหัสผ่านใหม่ที่ปลอดภัย <br/> เพื่อเข้าใช้งานระบบ CMS ของคุณ
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5">
          <div className="space-y-2">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              required
              className="rounded-xl border-slate-200 focus:ring-indigo-600 transition-all h-12"
            />
          </div>

          <div className="space-y-2">
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              required
              className="rounded-xl border-slate-200 focus:ring-indigo-600 transition-all h-12"
            />
          </div>

          {msg.text && (
            <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 ${
              msg.type === "success" 
              ? "bg-emerald-50 border border-emerald-100 text-emerald-700" 
              : "bg-rose-50 border border-rose-100 text-rose-700"
            }`}>
              <p className="text-xs font-bold mx-auto">{msg.text}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={loading || msg.type === "success"}
            className="w-full py-7 bg-slate-900 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 transition-all hover:scale-[1.01] active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>กำลังบันทึก...</span>
              </div>
            ) : "Update Password"}
          </Button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <Link 
              href="/login" 
              className="text-slate-400 hover:text-slate-800 font-bold text-sm transition-all inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} /> กลับไปหน้า Login
            </Link>
        </div>
      </AuthCard>
    </div>
  );
}

// Wrapper หลัก
export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <Suspense fallback={<Loader2 className="animate-spin text-white w-10 h-10" />}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/button";
import { AuthCard } from "@/app/components/ui/AuthCard";
import { ArrowLeft, Loader2} from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axiosInstance.post("/auth/login", form);
      router.push("/cms/category");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      setError(axiosError.response?.data?.error || "ล็อกอินไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden p-4 sm:p-6 lg:p-8">
      
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      
      <div className="w-full max-w-[450px] z-10 animate-in fade-in zoom-in duration-500">
        
        <AuthCard title="">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">CMS System</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input 
                label="อีเมล" 
                type="email" 
                placeholder="name@example.com"
                onChange={(e) => setForm({...form, email: e.target.value})}
                required
                className="rounded-xl border-slate-200 focus:ring-blue-600 transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-700">รหัสผ่าน</label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs font-bold text-blue-600 hover:text-indigo-600 transition-colors"
                >
                  forgot-password
                </Link>
              </div>
              <Input 
                label="" 
                type="password" 
                placeholder="••••••••"
                onChange={(e) => setForm({...form, password: e.target.value})}
                required
                className="rounded-xl border-slate-200 focus:ring-blue-600 transition-all"
              />
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-center gap-2 animate-shake">
                <p className="text-rose-600 text-xs font-bold mx-auto">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full py-7 bg-slate-900 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>กำลังตรวจสอบ...</span>
                </div>
              ) : "Sign In"}
            </Button>
          </form>

          
          <div className="mt-10 pt-6 border-t border-slate-100">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-800 font-bold text-sm transition-all group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              กลับหน้าแรก
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
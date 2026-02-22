// "use client";
// import { useState } from "react";
// import axios from "axios"; 
// import axiosInstance from "@/lib/axios";
// import { AuthCard } from "@/app/components/ui/AuthCard";
// import { Input } from "@/app/components/ui/Input";
// import { Button } from "@/app/components/ui/button";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState({ type: "", text: "" });

//   const handleRequestToken = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMsg({ type: "", text: "" });

//     try {
//       const res = await axiosInstance.post("/auth/forgotpass", { email });
//       setMsg({ 
//         type: "success", 
//         text: `ระบบได้ส่งลิงก์รีเซ็ตไปที่อีเมลของคุณแล้ว! (Test Token: ${res.data.token})` 
//       });
//     } catch (error: unknown) {
//       let errorMessage = "เกิดข้อผิดพลาด";

      
//       if (axios.isAxiosError(error)) {
        
//         const data = error.response?.data as { error?: string };
//         errorMessage = data?.error || error.message;
//       } else if (error instanceof Error) {
//         errorMessage = error.message;
//       }

//       setMsg({ 
//         type: "error", 
//         text: errorMessage 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthCard title="ลืมรหัสผ่าน">
//       <form onSubmit={handleRequestToken} className="space-y-4">
//         <Input
//           label="กรอกอีเมลเพื่อรับลิงก์รีเซ็ต"
//           type="email"
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <Button className="w-full" type="submit" disabled={loading}>
//           {loading ? "กำลังส่ง..." : "ส่งลิงก์ไปที่อีเมล"}
//         </Button>
//         {msg.text && (
//           <p className={`p-3 rounded text-sm ${msg.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//             {msg.text}
//           </p>
//         )}
//       </form>
//     </AuthCard>
//   );
// }



"use client";
import { useState } from "react";
import axios from "axios"; 
import axiosInstance from "@/lib/axios";
import { AuthCard } from "@/app/components/ui/AuthCard";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleRequestToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await axiosInstance.post("/auth/forgotpass", { email });
      setMsg({ 
        type: "success", 
        text: `ระบบได้ส่งลิงก์รีเซ็ตไปที่อีเมลของคุณแล้ว! (Test Token: ${res.data.token})` 
      });
    } catch (error: unknown) {
      let errorMessage = "เกิดข้อผิดพลาด";

      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { error?: string };
        errorMessage = data?.error || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setMsg({ 
        type: "error", 
        text: errorMessage 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Background Glow เหมือนหน้า Login */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[450px] z-10 animate-in fade-in zoom-in duration-500">
        <AuthCard title="">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Forgot Password</h1>
            <p className="text-slate-500 text-sm font-medium mt-2">ระบุอีเมลเพื่อรับลิงก์รีเซ็ตรหัสผ่าน</p>
          </div>

          <form onSubmit={handleRequestToken} className="space-y-6">
            <div className="space-y-2">
              <Input
                label="อีเมล"
                type="email"
                placeholder="name@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border-slate-200 focus:ring-blue-600 transition-all"
              />
            </div>

            {msg.text && (
              <div className={`p-3 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
                msg.type === "success" 
                ? "bg-green-50 border border-green-100 text-green-600" 
                : "bg-rose-50 border border-rose-100 text-rose-600"
              }`}>
                <p className="text-xs font-bold mx-auto text-center">{msg.text}</p>
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
                  <span>กำลังส่ง...</span>
                </div>
              ) : "Send Reset Link"}
            </Button>
          </form>

          {/* Footer ย้อนกลับ เหมือนหน้า Login */}
          <div className="mt-10 pt-6 border-t border-slate-100">
            <Link 
              href="/login" 
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-800 font-bold text-sm transition-all group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
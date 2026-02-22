import { authService } from "@/backend/services/authService";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { sendResetEmail } from "../services/mailService";

export const authController = {
  async login(req: Request) {
    try {
      const { email, password } = await req.json();
      
      if (!email || !password) return Response.json({ error: "Missing Email or Password" }, { status: 422 });

      const user = await authService.findUserByEmail(email);
      if (!user || !(await authService.verifyPassword(password, user.password))) {
        return Response.json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
      }

      const token = authService.generateSessionToken(user);
      await authService.updateLoginSession(user.id, token);
      
      (await cookies()).set("session_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 6 * 60 * 60,
        path: "/",
      });

      return Response.json({ message: "เข้าสู่ระบบสำเร็จ" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return Response.json({ error: message }, { status: 500 });
    }
  },

  async forgotPassword(req: Request) {
    try {
      const { email } = await req.json();
      if (!email) return Response.json({ error: "Email required" }, { status: 422 });

      const user = await authService.findUserByEmail(email);
      if (!user) return Response.json({ error: "ไม่พบผู้ใช้" }, { status: 404 });

      const updatedUser = await authService.createResetToken(email);

      await sendResetEmail(email, updatedUser.resetToken!);

      return Response.json({ message: "ส่งลิงก์รีเซ็ตไปที่อีเมลแล้ว" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return Response.json({ error: message }, { status: 500 });
    }
  },

  async resetPassword(req: Request) {
    try {
      const { token, newPassword } = await req.json();
      if (!token || !newPassword) return Response.json({ error: "Data incomplete" }, { status: 422 });

      const user = await authService.findUserByResetToken(token);
      if (!user) return Response.json({ error: "Token หมดอายุหรือผิดพลาด" }, { status: 400 });

      const hashedPassword = await authService.hashPassword(newPassword);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetExpire: null
        }
      });

      return Response.json({ message: "เปลี่ยนรหัสผ่านสำเร็จ" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Internal Server Error";
      return Response.json({ error: message }, { status: 500 });
    }
  },

  async logout() { 
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (token) {
    await prisma.user.updateMany({
      where: { loginToken: token },
      data: { status: "INACTIVATED", loginToken: null, loginExpire: null }
    });
  }
  cookieStore.delete("session_token");
  
  return Response.json({ message: "Logout สำเร็จ" });
}
};
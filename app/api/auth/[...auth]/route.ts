import { authController } from "@/backend/controller/authController";

// 1. ปรับ Type ให้ params เป็น Promise
export async function POST(
  req: Request, 
  { params }: { params: Promise<{ auth: string[] }> } 
) {
  // 2. ต้อง await params ก่อนเข้าถึงค่าข้างใน
  const { auth } = await params; 
  const action = auth[0]; 

  switch (action) {
    case "login":
      return authController.login(req);
    case "logout":
      return authController.logout();
    case "forgotpass":
      return authController.forgotPassword(req);
    case "resetpass":
      return authController.resetPassword(req);
    default:
      return Response.json({ error: "Path not found" }, { status: 404 });
  }
}
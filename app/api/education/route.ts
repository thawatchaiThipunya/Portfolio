import { educationController } from "@/backend/controller/educationController";

// ดึงข้อมูลทั้งหมด (GET /api/education)
export async function GET() {
  return educationController.getAll();
}

// สร้างข้อมูลใหม่ (POST /api/education)
export async function POST(req: Request) {
  return educationController.create(req);
}
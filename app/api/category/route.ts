import { categoryController } from "@/backend/controller/categoryController";

export const dynamic = 'force-dynamic';

// ดึงทั้งหมด
export async function GET() {
  return categoryController.getAll();
}

// สร้างใหม่
export async function POST(req: Request) {
  return categoryController.create(req);
}
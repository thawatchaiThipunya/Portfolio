import { contractController } from "@/backend/controller/contractController";

export const dynamic = 'force-dynamic';

// ดึงทั้งหมด
export async function GET() {
  return contractController.getAll();
}

// สร้างใหม่
export async function POST(req: Request) {
  return contractController.create(req);
}
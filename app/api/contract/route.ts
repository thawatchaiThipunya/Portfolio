import { contractController } from "@/backend/controller/contractController";

// ดึงทั้งหมด
export async function GET() {
  return contractController.getAll();
}

// สร้างใหม่
export async function POST(req: Request) {
  return contractController.create(req);
}
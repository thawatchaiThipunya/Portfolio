import { technicalController } from "@/backend/controller/technicalController";

export async function GET() {
  return technicalController.getAll();
}

export async function POST(req: Request) {
  return technicalController.create(req);
}
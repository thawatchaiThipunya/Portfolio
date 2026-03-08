import { projectController } from "@/backend/controller/projectController";

export const dynamic = 'force-dynamic';

export async function GET() {
  return projectController.getAll();
}

export async function POST(req: Request) {
  return projectController.create(req);
}
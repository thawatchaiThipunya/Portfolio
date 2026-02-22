import { projectController } from "@/backend/controller/projectController";

export async function GET() {
  return projectController.getAll();
}

export async function POST(req: Request) {
  return projectController.create(req);
}
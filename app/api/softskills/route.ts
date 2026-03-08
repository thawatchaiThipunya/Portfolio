import { softSkillController } from "@/backend/controller/softSkillController";

export const dynamic = 'force-dynamic';

export async function GET() {
  return softSkillController.getAll();
}

export async function POST(req: Request) {
  return softSkillController.create(req);
}
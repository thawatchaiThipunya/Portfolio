import { softSkillController } from "@/backend/controller/softSkillController";

type Params = Promise<{ id: string }>;

export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return softSkillController.getById(parseInt(id));
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return softSkillController.update(req, parseInt(id));
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return softSkillController.delete(parseInt(id));
}
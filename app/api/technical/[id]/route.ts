import { technicalController } from "@/backend/controller/technicalController";

type Params = Promise<{ id: string }>;

export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return technicalController.getById(parseInt(id));
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return technicalController.update(req, parseInt(id));
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  return technicalController.delete(parseInt(id));
}